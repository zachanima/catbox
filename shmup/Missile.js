"use strict";


var Missile = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };


  this.Awake = function() {
    this.gameObject.layer = 3;
    this.gameObject.AddComponent(BoxCollider);
    this.collider.layers = [2];

    this.time = 0;

    this.exhaust = new GameObject('Exhaust', ParticleSystem);
    this.exhaust.particleSystem.emissionRate = 60;
    this.exhaust.particleSystem.startSpeed = 0;
    this.exhaust.particleSystem.maxParticles = 18;
    this.exhaust.particleSystem.startLifetime = 0.3;
    this.exhaust.particleSystem.startSize = 3;
    this.exhaust.particleSystem.startColor = new Color(0xff, 0xdd, 0x88);
    this.exhaust.particleSystem.endColor = new Color(0xff, 0x00, 0x00);
  };



  this.FixedUpdate = function() {
    var direction = this.rigidbody.velocity.Normalized();
    var angle = Math.atan2(direction.x, -direction.y);
    this.transform.rotation = angle;
    this.rigidbody.velocity.x = 200*Math.sin((this.time/(1*Math.PI)) - this.startPoint);

    this.exhaust.transform.position.y = this.transform.position.y+Math.cos(this.transform.rotation)*7.5;
    this.exhaust.transform.position.x = this.transform.position.x-Math.sin(this.transform.rotation)*7;
    this.time += Math.PI/32;
    if (this.transform.position.y < -200) {
      Destroy(this.exhaust);
      Destroy(this.gameObject);
    }
  };
});
