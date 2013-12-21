"use strict";

var Star = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };



  this.Awake = function() {
    this.particleSystem.startLifetime = 24;
    this.particleSystem.emissionRate = 60;
    this.particleSystem.graphic.fillColor = Color.white;
    this.particleSystem.graphic.Cache();
  };



  this.Start = function() {
    this.particleSystem.maxParticles = 5000;
    this.transform.rotation = Math.PI;
    for (var i = 0; i < 768; ++i) {
      this.transform.position.x = Math.ceil(Math.random() * 800) + 0.25;
      this.transform.position.y = Math.ceil(Math.random() * 480) + 0.25;
      this.particleSystem.startSpeed = (20 + Math.random() * 100);
      this.particleSystem.Emit(1);
    }
    this.transform.position.y = -1;
  };



  this.Update = function() { 
    this.transform.position.x = Math.ceil(Math.random() * 800) + 0.25;
    this.particleSystem.startSpeed = 20 + Math.random() * 100;
  };
});
