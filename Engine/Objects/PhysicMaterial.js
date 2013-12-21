"use strict";

var PhysicMaterial = Object.augment(function() {
  this.constructor = function() {
    this.staticFriction = 0;
    this.dynamicFriction = 0;
    this.bounciness = 0;
  }
});
