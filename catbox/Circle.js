"use strict";

var Circle = Graphic.augment(function(base) {
  this.constructor = function(radius) {
    base.constructor.call(this);
    this.radius = radius;
    this.stroke = false;
    this.fill = true;
  };



  this.Cache = function() {
    var canvas = document.createElement('canvas');
    canvas.width = this.radius;
    canvas.height = this.radius;
    var context = canvas.getContext('2d');
    context.translate(this.radius / 2, this.radius / 2);
    this.canvas = null;
    this.Render(context);
    this.canvas = canvas;

    return this;
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

    context.beginPath();
    context.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI, false);
    if (this.stroke) { context.stroke(); }
    if (this.fill)   { context.fill(); }

    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
  };
});
