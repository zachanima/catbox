"use strict";

var Particle = Object.augment(function(base) {
  this.constructor = function(position) {
    base.constructor.call(this);
    this.position = Vector2.zero;
    this.velocity = Vector2.zero;
  };



  this.Update = function() {
    //Destroy after some time
    this.lifetime -= Time.deltaTime;
    if (this.lifetime <= 0) {
      this.particleSystem.particles.splice(0,1)
    }
  };



  this.SimulatePhysics = function() {
    this.position.x += this.velocity.x * Time.fixedDeltaTime;
    this.position.y += this.velocity.y * Time.fixedDeltaTime;
    this.velocity.x += Physics.gravity.x * this.particleSystem.gravityModifier;
    this.velocity.y += Physics.gravity.y * this.particleSystem.gravityModifier;
  };



  this.Render = function() {
    var weight = 1 - this.lifetime / this.startLifetime;
    var size = Noise.Lerp(this.size, this.particleSystem.endSize, weight);
    context.fillStyle =
      Color.Lerp(this.color, this.particleSystem.endColor, weight).toString();
    context.fillRect(this.position.x, this.position.y, size, size);
  };
});
