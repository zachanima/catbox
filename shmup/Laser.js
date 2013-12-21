"use strict";

var Laser = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };

  

  this.Awake = function() {
    this.gameObject.layer = 2;
    this.gameObject.Add(Rigidbody);
    this.gameObject.Add(BoxCollider);
    this.collider.layers = [2];
    this.collider.width = 10;
    this.collider.height = 10;
    this.collider.isTrigger = true;

    this.gameObject.Add(ParticleSystem); 
    this.particleSystem.lifetime = 0.02;
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
