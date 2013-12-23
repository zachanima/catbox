"use strict";

var Enemy2 = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };

  this.Awake = function() {
    this.transform.position.y = 200;
    this.transform.position.x = 400;
    this.transform.rotation = Math.PI/2;
    
    this.explosion = new GameObject('Explosion', ParticleSystem);
    this.explosion.transform.position = this.transform.position.Copy();
    this.explosion.particleSystem.graphic = new Circle(3);
    this.explosion.particleSystem.emissionRate = 60;
    this.explosion.particleSystem.maxParticles = 10;
    this.explosion.particleSystem.startSpeed = 190;
    this.explosion.particleSystem.startColor = new Color(0xff, 0xcc, 0x66);
    this.explosion.particleSystem.endColor = new Color(0xff, 0x00, 0x00);
    this.explosion.particleSystem.endSize = 0.1;
    this.explosion.particleSystem.startLifetime = 1;
  };


  this.Update = function() {
    this.explosion.transform.rotation = Math.random()*2*Math.PI;
  };
});
