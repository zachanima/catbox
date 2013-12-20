"use strict";

var Particle = Object.augment(function(base) {
  this.constructor = function(position) {
    base.constructor.call(this);
    this.position = position || Vector2.zero;
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
    this.velocity.x += Physics.gravity.x * this.particleSystem.gravityMultiplier;
    this.velocity.y += Physics.gravity.y * this.particleSystem.gravityMultiplier;
  };



  this.Render = function() {
    context.fillStyle = this.style;
    context.fillRect(this.position.x, this.position.y, 1, 1);
  };
});
