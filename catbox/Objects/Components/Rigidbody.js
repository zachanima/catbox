"use strict";

var Rigidbody = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.velocity = Vector2.zero;
    this.force = Vector2.zero;
    this.mass = 1;
    this.useGravity = true;
    Object.defineProperty(this, 'position', { // TODO: Apply interpolation.
      get: function() { return this.transform.position; },
      set: function(value) { this.transform.position = value; },
    });
  };


  // TODO: Run collision detection separately from position updating.
  this.SimulatePhysics = function() {
  };



  this.AddForce = function(force) {
    this.force = this.force.Add(force);
    // this.velocity = this.velocity.Add(force.Mul(1 / this.mass));
  };
});
