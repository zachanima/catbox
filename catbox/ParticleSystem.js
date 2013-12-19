"use strict";

var ParticleSystem = Component.extend({
  particles: [],
  delay: 0,
  rate: 10,
  gravityMultiplier: 1,
  startVelocity: Vector2.zero,
  lifetime: 5,


  Update: function() {
    while (this.delay <= 0) {
      this.Emit();
      this.delay += 1 / this.rate;
    }

    this.delay -= Time.deltaTime;
    
    for (var i = this.particles.length; i--;) {
      this.particles[i].Update();
    }
  },



  SimulatePhysics: function() {
    for (var i = this.particles.length; i--;) {
      this.particles[i].SimulatePhysics();
    }
  },



  Render: function() {
    var transform = this.transform;

    context.save();
    context.translate(-parseInt(transform.position.x), -parseInt(transform.position.y));
    context.rotate(-transform.rotation);
    context.scale(1 / transform.scale.x, 1 / transform.scale.y);

    for (var i = this.particles.length; i--;) {
      this.particles[i].Render();
    }

    context.restore();
  },



  Emit: function() {
    var particle = new Particle(new Vector2(this.transform.position.x, this.transform.position.y));
    particle.particleSystem = this;
    particle.lifetime = this.lifetime;
    particle.velocity = new Vector2(this.startVelocity.x, this.startVelocity.y);
    this.particles.push(particle);
  },
});
