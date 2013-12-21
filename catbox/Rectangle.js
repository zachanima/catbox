"use strict";

var Rectangle = Graphic.augment(function(base) {
  this.constructor = function(width, height) {
    base.constructor.call(this);
    this.width = width;
    this.height = height;
    this.stroke = false;
    this.fill = true;
  };



  this.Render = function(context) {
    var strokeStyle = context.strokeStyle;
    var fillStyle = context.fillStyle;

    if (this.strokeColor) {
      context.strokeStyle = this.strokeColor.toString();
    }
    if (this.fillColor) {
      context.fillStyle = this.fillColor.toString();
    }

    if (this.stroke) {
      context.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
    if (this.fill) {
      context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }

    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
  };
});
