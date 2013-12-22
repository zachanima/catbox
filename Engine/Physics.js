"use strict";

var Physics = {
  AllLayers: 0x7fffffff,
  bounceThreshod: 2, // TODO: Convert to pixels.
  DefaultRaycastLayers: 0x7fffffff ^ 0x04,
  gravity: Vector2.down.Mul(9.81),
  IgnoreRaycastLayer: 0x04,
  maxAngularVelocity: 7, // TODO: Convert to radians.
  minPenetrationForPenalty: 0.05, // TODO: Convert to pixels.
  positionIterations: 7, // TODO: Look up sane default.
  raycastsHitTriggers: false,
  sleepAngularVelocity: 0.14, // TODO: Convert to radians.
  sleepVelocity: 0.15, // TODO: Convert to pixels.
  solverIterationCount: 7,
  velocityIterations: 7, // TODO: Look up sane default.

  colliders: [],
  rigidbodies: [],



  OverlapAreaAll: function(a, b, layerMask) {
    var colliders = [];

    layerMask = layerMask || Physics.DefaultRaycastLayers;

    for (var i = Physics.colliders.length; i--;) {
      var collider = Physics.colliders[i];

      // Skip if collider's layer is not in layer mask.
      if ((0x1 << collider.gameObject.layer) & layerMask == 0x0) {
        continue;
      }


      if (collider instanceof BoxCollider) {
        if (b.x < collider.transform.position.x + collider.center.x - collider.size.x / 2 ||
            a.x > collider.transform.position.x + collider.center.x + collider.size.x / 2 ||
            b.y < collider.transform.position.y + collider.center.y - collider.size.y / 2 ||
            a.y > collider.transform.position.y + collider.center.y + collider.size.y / 2) {
          // TODO: Invert logical composite expression above.
        } else {
          colliders.push(collider);
        }
      }
    }

    return colliders;
  },



  Simulate: function() {
    // Acceleration.
    Physics.SimulateCollisions(); // Add forces.
    Physics.SimulateGravity(); // Add forces.
    // Physics.SimulateConstantForces(); // Add forces. TODO: Default applied force.

    // Velocity.
    Physics.SimulateAcceleration(); // Apply forces.

    // Position.
    Physics.SimulateVelocity(); // Apply velocities.
  },



  SimulateAcceleration: function() {
    for (var i = Physics.rigidbodies.length; i--;) {
      var rigidbody = Physics.rigidbodies[i];
      rigidbody.velocity =
        rigidbody.velocity.Add(rigidbody.force.Mul(1 / rigidbody.mass));

      rigidbody.force = Vector2.zero; // TODO: Use constant force as default.
    }
  },



  SimulateCollisions: function() {
    var a = new Vector2(0, 0);
    var b = new Vector2(canvas.width, canvas.height);
    var colliders = Physics.OverlapAreaAll(a, b);

    var length = colliders.length;
    for (var i = length; i--;) {
      var collider = colliders[i];

      if (!collider.rigidbody) {
        continue;
      }

      // Get a list of colliders within the bounding box of this collider.
      var a = new Vector2(
        collider.rigidbody.position.x + collider.center.x - collider.size.x / 2,
        collider.rigidbody.position.y + collider.center.y - collider.size.y / 2
      );
      var b = new Vector2(
        collider.rigidbody.position.x + collider.center.x + collider.size.x / 2,
        collider.rigidbody.position.y + collider.center.y + collider.size.y / 2
      );

      var _colliders = Physics.OverlapAreaAll(a, b);
      var _length = _colliders.length;

      if (_length > 1) {
        for (var j = _length; j--;) {
          var _collider = _colliders[j];

          // Skip self.
          if (collider === _collider) {
            continue;
          }

          // TODO: Branch earlier for collider instanceof.
          if (collider.Detect(_collider)) {
            collider.Respond(_collider);
          }
        }
      }
    }
  },



  SimulateGravity: function() {
    for (var i = Physics.rigidbodies.length; i--;) {
      var rigidbody = Physics.rigidbodies[i];
      rigidbody.AddForce(Physics.gravity.Mul(rigidbody.mass * 0.02));
    }
  },



  SimulateVelocity: function() {
    for (var i = Physics.rigidbodies.length; i--;) {
      var rigidbody = Physics.rigidbodies[i];
      rigidbody.position = rigidbody.position.Add(rigidbody.velocity);
    }
  },
};
