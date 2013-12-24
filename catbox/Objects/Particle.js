"use strict";

var Particle = Object.augment(function(base) {
  this.constructor = function(position) {
    base.constructor.call(this);
    this.position = Vector2.zero;
    this.velocity = Vector2.zero;
  };



  this.Update = function() {
    this.position.x += this.velocity.x * Time.deltaTime;
    this.position.y += this.velocity.y * Time.deltaTime;
    this.velocity.x += Physics.gravity.x * this.particleSystem.gravityModifier;
    this.velocity.y += Physics.gravity.y * this.particleSystem.gravityModifier;
    //Destroy after some time
    this.lifetime -= Time.deltaTime;
    if (this.lifetime <= 0) {
      this.particleSystem.particles.splice(0,1)
    }
  };



  this.SimulatePhysics = function() {
  };



  this.Render = function() {
    var weight = 1 - this.lifetime / this.startLifetime;
    var size = Mathf.Lerp(this.size, this.particleSystem.endSize, weight);

    if (this.color != this.particleSystem.endColor) {
      context.fillStyle =
        Color.Lerp(this.color, this.particleSystem.endColor, weight).toString();
    }

    context.save();
    context.translate(parseInt(this.position.x) + 0.5, parseInt(this.position.y) + 0.5);
    // context.rotate
    context.scale(size, size);

    if (this.graphic) {
      this.graphic.Render(context);
    } else {
      context.fillRect(-0.5, -0.5, 1, 1);
    }

    context.restore();
  };
});