"use strict";

var Rigidbody = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.velocity = Vector2.zero;
    this.mass = 1;
    this.useGravity = true;
    Object.defineProperty(this, 'position', { // TODO: Use 'value'.
      get: function() { return this.transform.position; },
      set: function(value) { this.transform.position = value; },
    });
  };


  // TODO: Run collision detection separately from position updating.
  this.SimulatePhysics = function() {
    var collision = false;
    var position =
      this.transform.position.Add(this.velocity.Mul(Time.fixedDeltaTime));

    // Collide with other colliders.
    if (this.collider) {
      var velocity = this.velocity.Copy();
      for (var i = Engine.colliders.length; i--;) {
        var collider = Engine.colliders[i];
        if (collider.gameObject !== this.gameObject) {
          collision = collision || this.collider.Collide(collider, position, velocity);
        }
      }
    }

    // Only update position if there was no collision.
    if (!collision) {
      this.transform.position = position;
    } else {
    }

    if (this.useGravity) {
      this.AddForce(Physics.gravity.Mul(this.mass));
    }
  };



  this.AddForce = function(force) {
    this.velocity = this.velocity.Add(force.Mul(1 / this.mass));
  };
});
