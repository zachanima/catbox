"use strict";

var Laser = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };

  

  this.Awake = function() {
    this.gameObject.layer = 2;
    this.gameObject.AddComponent(Rigidbody);
    this.gameObject.AddComponent(BoxCollider);
    this.collider.layers = [2];
    this.collider.width = 10;
    this.collider.height = 10;
    this.collider.isTrigger = true;

    this.gameObject.AddComponent(ParticleSystem); 
    this.particleSystem.startLifetime = 0.2;
    this.particleSystem.startColor = new Color(0x00, 0xff, 0x00);
    this.particleSystem.endColor = new Color(0x00, 0xff, 0x00, 0);
    this.particleSystem.emissionRate = 100;
    this.particleSystem.startSize = 2;
    this.particleSystem.endSize = 1;
  };


  this.Update = function() {
    this.transform.position.y -= 10;
    if (this.transform.position.y < -800) {
      Destroy(this.gameObject);
    }
  };
});
