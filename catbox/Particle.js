"use strict";

var Particle = Class.extend({
  life: 10000,



  init: function(position) {
    this.position = position || Vector2.zero;
    this.velocity = Vector2.zero;


    //var _this = this;
    //setTimeout(function() {
    //  _this.particleSystem.particles.splice(_this.particleSystem.particles,1);
    //}, this.life);
  },



  Update: function() {
    //Destroy after some time
    this.lifetime -= Time.deltaTime;
    if (this.lifetime <= 0) {
      this.particleSystem.particles.splice(0,1)
    }
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
