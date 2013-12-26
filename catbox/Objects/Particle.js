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
    this.lifetime -= Time.deltaTime;
    if (this.lifetime <= 0) {
      this.particleSystem.particles.splice(0,1)
    }
  };



  this.Render = function() {
    var weight = 1 - this.lifetime / this.startLifetime;
    var size = Mathf.Lerp(this.size, this.particleSystem.endSize, weight);

    if (this.color != this.particleSystem.endColor) {
      context.fillStyle =
        Color.Lerp(this.color, this.particleSystem.endColor, weight).toString();
    }


    if (this.graphic) {
      context.save();
      context.rotate(this.rotation);
      context.scale(size, size);
      context.translate(
        1 / size * (Math.floor(this.position.x) + 0.5),
        1 / size * (Math.floor(this.position.y) + 0.5)
      );

      this.graphic.Render(context);

      context.restore();

    } else { // Default is pixel particle.
      context.fillRect(
        Math.floor(this.position.x - size / 2),
        Math.floor(this.position.y - size / 2), size, size);
    }

  };
});
