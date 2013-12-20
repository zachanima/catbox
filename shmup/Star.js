"use strict";

var Star = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };



  this.Awake = function() {
    this.particleSystem.lifetime = 24;
    this.particleSystem.rate = 30;
  };



  this.Start = function() {
    for (var i = 0; i < 500; ++i) {
      this.transform.position.x = Math.ceil(Math.random() * 800) + 0.25;
      this.transform.position.y = Math.ceil(Math.random() * 480) + 0.25;
      this.particleSystem.startVelocity = Vector2.down.Mul(20 + Math.random() * 100);
      this.particleSystem.Emit();
    }
    this.transform.position.y = -1;
  };



  this.Update = function() { 
    this.transform.position.x = Math.ceil(Math.random() * 800) + 0.25;
    this.particleSystem.startVelocity = Vector2.down.Mul(20 + Math.random() * 100);
  };
});
