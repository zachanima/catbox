"use strict";

var Star = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };



  this.Awake = function() {
    this.particleSystem.startLifetime = 24;
    this.particleSystem.emissionRate = 40;
    this.particleSystem.startColor = Color.white;
    this.particleSystem.endColor = Color.white;
  };



  this.Start = function() {
    this.particleSystem.maxParticles = 1400;
    this.transform.rotation = Math.PI;
    for (var i = 0; i < 400; ++i) {
      this.transform.position.x = Math.ceil(Math.random() * 800) - 400.25;
      this.transform.position.y = Math.ceil(Math.random() * 480) - 240.25;
      this.particleSystem.startSpeed = (20 + Math.random() * 100);
      this.particleSystem.Emit(1);
    }
    this.transform.position.y = -240.25;
  };



  this.Update = function() { 
    this.transform.position.x = Math.ceil(Math.random() * 800) - 400.25;
    this.particleSystem.startSpeed = 20 + Math.random() * 100;
  };
});
