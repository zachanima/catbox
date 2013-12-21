"use strict";

var ParticleSystem = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.startDelay = 0;
    this.emissionRate = 10;
    this.enableEmission = true;
    this.gravityModifier = 1;
    this.maxParticles = 1000;
    this.startLifetime = 5;
    this.graphic = new Rectangle(1, 1);
    this.startColor = Color.white;
    this.endColor = Color.white;
    this.particles = [];
    this.startSpeed = 5;
    this.startSize = 1;
    this.endSize = 1;
    this.simulationSpace = 'world';
  };



  this.Update = function() {
    if (this.enableEmission) {
      while (this.startDelay <= 0) {
        this.Emit(1); // TODO: Emit all at once.
        this.startDelay += 1 / this.emissionRate;
      }

      this.startDelay -= Time.deltaTime;
    }
    
    for (var i = this.particles.length; i--;) {
      this.particles[i].Update();
    }
  };



  this.SimulatePhysics = function() {
    for (var i = this.particles.length; i--;) {
      this.particles[i].SimulatePhysics();
    }
  };



  this.Render = function() {
    var transform = this.transform;

    if (this.simulationSpace == 'world') {
      context.save();
      context.scale(1 / transform.scale.x, 1 / transform.scale.y);
      context.rotate(-transform.rotation);
      context.translate(-parseInt(transform.position.x), -parseInt(transform.position.y));
    }

    for (var i = this.particles.length; i--;) {
      this.particles[i].Render();
    }

    if (this.simulationSpace == 'world') {
      context.restore();
    }
  };



  this.Emit = function(count) {
    while (count--) {
      if (this.particles.length < this.maxParticles) {
        var particle = new Particle();
        if (this.simulationSpace == 'world') {
          particle.position = new Vector2(this.transform.position.x, this.transform.position.y);
        }
        particle.particleSystem = this;
        particle.lifetime = this.startLifetime;
        particle.velocity = new Vector2(Math.cos(-Math.PI / 2 + this.transform.rotation), Math.sin(-Math.PI / 2 + this.transform.rotation)).Mul(this.startSpeed);
        particle.color = this.startColor;
        particle.size = this.startSize;
        particle.graphic = this.graphic;
        particle.startLifetime = this.startLifetime;
        this.particles.push(particle);
      }
    }
  };
});
