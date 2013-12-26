"use strict";

var ParticleSystem = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.duration = 5;
    this.looping = true;
    this.startDelay = 0;
    this.emissionRate = 10;
    this.enableEmission = true;
    this.gravityModifier = 1;
    this.maxParticles = 1000;
    this.startLifetime = 5;
    this.graphic = null;
    this.startColor = Color.black;
    this.endColor = Color.black;
    this.particles = [];
    this.startSpeed = 5;
    this.startSize = 1;
    this.endSize = 1;
    this.simulationSpace = 'local';
    this.startRotation = 0;
    this.angle = Math.PI / 4;
    this.time = 5;
  };



  this.Update = function() {
    if (this.enableEmission) {
      if (this.startDelay <= -1 / this.emissionRate) {
        this.Emit(Math.floor(-this.startDelay * this.emissionRate));
        this.startDelay += Math.floor(-this.startDelay * this.emissionRate) / this.emissionRate; // Is `ceil` correct?
      }

      for (var t in this.emissionBursts) {
        if (this.time <= this.duration - t && this.time >= this.duration - t - Time.deltaTime) {
          console.log(this.emissionBursts[t]);
          this.Emit(this.emissionBursts[t]);
        }
      }

      this.startDelay -= Time.deltaTime;
      this.time -= Time.deltaTime;

      if (this.time < 0) {
        this.time += this.duration;
      }
    }
    
    for (var i = this.particles.length; i--;) {
      this.particles[i].Update();
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
        var angle = Math.random() * this.angle - this.angle / 2;
        var particle = new Particle();
        if (this.simulationSpace == 'world') {
          particle.position = new Vector2(this.transform.position.x, this.transform.position.y);
        }
        particle.particleSystem = this;
        particle.lifetime = this.startLifetime;
        particle.velocity = new Vector2(
          Math.cos(-Math.PI / 2 + this.transform.rotation + angle),
          Math.sin(-Math.PI / 2 + this.transform.rotation + angle)
        ).Mul(this.startSpeed);
        particle.color = this.startColor;
        particle.size = this.startSize;
        particle.graphic = this.graphic;
        particle.startLifetime = this.startLifetime;
        particle.rotation = this.startRotation;
        this.particles.push(particle);
      }
    }
  };
});
