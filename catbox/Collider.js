"use strict";

var Collider = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.width = 1;
    this.height = 1;
    this.layers = [0];
    this.material = new PhysicMaterial();
  };



  this.Collide = function(collider, position, velocity) {
    if (collider instanceof BoxCollider) {
      return this.BoxCollide(collider, position, velocity);
    }

    if (collider instanceof CircleCollider) {
      return this.CircleCollide(collider, position, velocity);
    }

    return false;
  };



  this.BoxCollide = function() { return false; };
  this.CircleCollide = function() { return false; };



  this.GetBounds = function() {
    return new Rect(
      this.transform.position.x - this.width  / 2,
      this.transform.position.y - this.height / 2,
      this.width, this.height
    );
  };
});
