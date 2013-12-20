"use strict";

var Circle = Shape.augment(function() {
  this.constructor = function(radius) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 2 * radius;
    this.canvas.height = 2 * radius;
    this.context = this.canvas.getContext('2d');
    this.context.beginPath();
    this.context.arc(radius, radius, radius, 0, 2 * Math.PI, true);
    this.context.fill();
  };
});
