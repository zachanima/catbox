"use strict";

var Particle = Class.extend({
  init: function(position) {
    this.position = position || Vector2.zero;
    this.velocity = Vector2.zero;
  },



  SimulatePhysics: function() {
    this.position.x += this.velocity.x * Time.fixedDeltaTime;
    this.position.y += this.velocity.y * Time.fixedDeltaTime;
    this.velocity.x += Physics.gravity.x * this.particleSystem.gravityMultiplier;
    this.velocity.y += Physics.gravity.y * this.particleSystem.gravityMultiplier;
  },



  Render: function() {
    context.fillStyle = '#fff';
    context.fillRect(this.position.x, this.position.y, 1, 1);
  },
});
