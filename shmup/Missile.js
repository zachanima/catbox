"use strict";


var Missile = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };

  this.Awake = function() {
    this.time = Time.realtimeSinceStartup;
    
    this.exhaust = new GameObject('Exhaust', ParticleSystem);
    this.exhaust.particleSystem.emissionRate = 60;
    this.exhaust.particleSystem.startColor = new Color(0xff, 0xff, 0xff);
    this.exhaust.particleSystem.startSpeed = 0;
  };



  this.Update = function() {
    var direction = this.rigidbody.velocity.Normalized();
    var angle = Math.atan2(direction.x, -direction.y);
    this.transform.rotation = angle;
    this.rigidbody.velocity.x = 400*Math.sin(Math.PI/2+Time.realtimeSinceStartup - this.time);
    this.rigidbody.velocity.y = -Math.pow(Math.abs(this.rigidbody.velocity.y), 1.000);

    this.exhaust.transform.position.y = this.transform.position.y+Math.cos(this.transform.rotation)*7.5;
    this.exhaust.transform.position.x = this.transform.position.x-Math.sin(this.transform.rotation)*7;
  };
});
