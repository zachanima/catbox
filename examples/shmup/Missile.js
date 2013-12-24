"use strict";


var Missile = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };


  this.Awake = function() {
    this.time = 0;
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
