"use strict";

var Renderer = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    Object.defineProperty(this, 'width', {
      get: function() { return this.graphic.width; }
    });
    Object.defineProperty(this, 'height', {
      get: function() { return this.graphic.height; }
    });
  }



  this.Render = function() {
    this.graphic.Render(context);
  }
});
