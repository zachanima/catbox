"use strict";

var Graph = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };



  this.Awake = function() {
    this.seed = Math.random() * 200000;
  };



  this.Render = function() {
    for (var y = canvas.height; y--;) {
      for (var x = canvas.width; x--;) {
        context.fillStyle = 'rgba(' + parseInt(127 + Noise.Sin2(this.seed + 31000337 + Time.realtimeSinceStartup + x * 0.1, this.seed / 123 + 1667 + y * 0.1, 2) * 127) + ', 0, 0, 255)';
        context.fillRect(x, y, 1, 1);
      }
    }
  };
});
