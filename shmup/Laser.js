"use strict";

var Laser = Component.extend({

  

  Awake: function() {
    this.gameObject.layer = 1;
    this.Add(Rigidbody);
    this.Add(BoxCollider);
    this.collider.layers = [1];
    this.collider.width = 10;
    this.collider.height = 10;
    this.collider.isTrigger = true;

    this.Add(ParticleSystem); 
    this.particleSystem.lifetime = 0.02;
    this.particleSystem.rate = 1000;
    this.particleSystem.style = '#00ff00';
  },


  Update: function() {
    this.transform.position.y -= 10;
    if (this.transform.position.y < -800) {
      Destroy(this.gameObject);
    }
  },
});
