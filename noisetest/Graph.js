"use strict";

var Graph = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };



  this.Awake = function() {
    this.seed = Math.random() * 2000000000;
  };



  this.Render = function() {
    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(canvas.width, canvas.height / 2);
    for (var x = canvas.width; x--;) {
      context.lineTo(x, canvas.height / 2 + canvas.height / 4 * Noise.Sin(Time.realtimeSinceStartup * 200 + this.seed + 0.25 * x, 16));
    }
    context.stroke();
  };
});
