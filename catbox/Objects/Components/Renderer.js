"use strict";

var Renderer = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
  };



  this.Render = function() {
    if (this.canvas) {
      context.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2);

    } else {
      this.graphic.Render(context);
    }
  };



  this.Cache = function() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.graphic.width;
    this.canvas.height = this.graphic.height;
    this.context = this.canvas.getContext('2d');
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.graphic.Render(this.context);
    this.context.restore();
  };
});
