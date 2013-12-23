"use strict";

var Ball = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };



  this.FixedUpdate = function() {
    for (var i = Engine.gameObjects.length; i--;) {
      this.Attract(Engine.gameObjects[i]);
    }
  };



  this.Attract = function(other) {
    var delta = other.transform.position.Sub(this.transform.position);
    var sqrMagnitude = delta.Dot(delta);
    var direction = delta.Div(Math.sqrt(sqrMagnitude));
    this.rigidbody.AddForce(
      direction.Mul((this.rigidbody.mass + other.rigidbody.mass) / 2 * 128 / Math.max(64, sqrMagnitude))
    );
  };
});
