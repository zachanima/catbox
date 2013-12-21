"use strict";

var ParticleSystem = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.delay = 0;
    this.rate = 10;
    this.gravityMultiplier = 1;
    this.lifetime = 5;
    this.style = '#fff';
    this.particles = [];
    this.startVelocity = Vector2.zero;
    this.startSize = 1;
  };



  this.Update = function() {
    while (this.delay <= 0) {
      this.Emit();
      this.delay += 1 / this.rate;
    }

    this.delay -= Time.deltaTime;
    
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

    context.save();
    context.translate(-parseInt(transform.position.x), -parseInt(transform.position.y));
    context.rotate(-transform.rotation);
    context.scale(1 / transform.scale.x, 1 / transform.scale.y);

    for (var i = this.particles.length; i--;) {
      this.particles[i].Render();
    }

    context.restore();
  };



  this.Emit = function() {
    var particle = new Particle(new Vector2(this.transform.position.x, this.transform.position.y));
    particle.particleSystem = this;
    particle.lifetime = this.lifetime;
    particle.style = this.style;
    particle.size = this.startSize;
    particle.velocity = new Vector2(this.startVelocity.x, this.startVelocity.y);
    this.particles.push(particle);
  };
});
