"use strict";

var Star = Component.extend({
  Awake: function() {
    this.Add(ParticleSystem);
    this.particleSystem.rate = 60;
    for (var i = 0; i < 1000; ++i) {
      this.transform.position.x = Math.ceil(Math.random() * 800) + 0.25;
      this.transform.position.y = Math.ceil(Math.random() * 480) + 0.25;
      this.particleSystem.startVelocity = Vector2.down.Mul(Math.random() * 100);
      this.particleSystem.Emit();
    }
    this.transform.position.y = -1;
  },



  Update: function() { 
    this.transform.position.x = Math.ceil(Math.random() * 800) + 0.25;
    this.particleSystem.startVelocity = Vector2.down.Mul(Math.random() * 100);
  },
});
