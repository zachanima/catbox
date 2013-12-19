"use strict";

var Laser = Component.extend({

  

  Awake: function() {
    this.gameObject.layer = 1;
    this.Add(Rigidbody);
    this.Add(BoxCollider);
    this.collider.layers = [1];
    this.collider.width = 100;
    this.collider.height = 100;

    this.Add(ParticleSystem); 
    this.particleSystem.lifetime = 0.1;
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
