"use strict";

var Laser = Component.extend({

  

  Awake: function() {
    this.Add(BoxCollider);

    this.Add(ParticleSystem); 
    this.particleSystem.lifetime = 100;
    this.particleSystem.rate = 100;
    this.particleSystem.style = '#00ff00';
  },


  Update: function() {
    this.transform.position.y -= 10;
    if (this.transform.position.y < -800) {
      Destroy(this.gameObject);
    }
  },
});
