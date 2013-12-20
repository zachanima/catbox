"use strict";

var Laser = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };

  

  this.Awake = function() {
    this.gameObject.layer = 1;
    this.gameObject.Add(Rigidbody);
    this.gameObject.Add(BoxCollider);
    this.collider.layers = [1];
    this.collider.width = 100;
    this.collider.height = 100;

    this.gameObject.Add(ParticleSystem); 
    this.particleSystem.lifetime = 0.1;
    this.particleSystem.rate = 100;
    this.particleSystem.style = '#00ff00';
  };


  this.Update = function() {
    this.transform.position.y -= 10;
    if (this.transform.position.y < -800) {
      Destroy(this.gameObject);
    }
  };
});
