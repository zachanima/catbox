"use strict";

var Rectangle = Graphic.augment(function(base) {
  this.constructor = function(width, height) {
    base.constructor.call(this);
    this.width = width;
    this.height = height;
  };



  this.Render = function(context) {
    context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
  };
});
