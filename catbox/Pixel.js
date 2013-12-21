"use strict";

var Pixel = Graphic.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };



  this.Render = function(context) {
    context.fillRect(-0.5, -0.5, 1, 1);
  };
});
