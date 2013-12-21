"use strict";

var Rectangle = Graphic.augment(function(base) {
  this.constructor = function(width, height) {
    base.constructor.call(this);
    this.width = width;
    this.height = height;
    this.stroke = false;
    this.fill = true;
  };



  this.Cache = function() {
    var canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    var context = canvas.getContext('2d');
    context.translate(this.width / 2, this.height / 2);
    this.canvas = null;
    this.Render(context);
    this.canvas = canvas;

    return this;
  };



  this.Render = function(context) {
    if (this.canvas) {
      context.drawImage(this.canvas, -this.width / 2, -this.height / 2);

    } else {
      var strokeStyle = context.strokeStyle;
      var fillStyle = context.fillStyle;

      if (this.strokeColor) {
        context.strokeStyle = this.strokeColor.toString();
      }
      if (this.fillColor) {
        context.fillStyle = this.fillColor.toString();
      }

      if (this.fill) {
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      }
      if (this.stroke) {
        context.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
      }

      context.strokeStyle = strokeStyle;
      context.fillStyle = fillStyle;
    }
  };
});
