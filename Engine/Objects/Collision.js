"use strict";

var Collision = Object.augment(function() {
  this.constructor = function(collider, normal, penetration, relativeVelocity) {
    this.collider = collider;
    this.normal = normal;
    this.gameObject = collider.gameObject;
    this.relativeVelocity = relativeVelocity;
    this.rigidbody = collider.rigidbody;
    this.transform = collider.transform;
  };
});
