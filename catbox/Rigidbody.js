"use strict";

var Rigidbody = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.velocity = new Vector2(0, 0);
    this.mass = 1;
    this.useGravity = true;
  };



  this.SimulatePhysics = function() {
    this.transform.position =
      this.transform.position.Add(this.velocity.Mul(Time.fixedDeltaTime));

    if (this.useGravity) {
      this.AddForce(Physics.gravity.Mul(this.mass));
    }
  };



  this.AddForce = function(force) {
    this.velocity = this.velocity.Add(force.Mul(1 / this.mass));
  };
});
