"use strict";

var Body = Component.extend({
  Attract: function(body) {
    var delta = body.transform.position.Sub(this.transform.position);
    var sqrMagnitude = Math.max(256, delta.Dot(delta));
    var direction = delta.Div(Math.sqrt(sqrMagnitude));
    this.rigidbody.AddForce(
      direction.Mul(10000 / sqrMagnitude)
    );
  },
});
