"use strict";

var Circle = Graphic.augment(function(base) {
  this.constructor = function(radius) {
    base.constructor.call(this, 2 * radius, 2 * radius);
    this.radius = radius;
  };



  this.Render = function(context) {
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
    context.fill();
  };
});
