"use strict";

var CircleCollider = Collider.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.material
  };



  this.Awake = function() {
    if (this.renderer) {
      this.radius = Math.max(this.renderer.width, this.renderer.height) / 2;
    }
  };



  this.BoxCollide = function(collider, position, velocity) {
    var distance = new Vector2(
      Math.abs(position.x - collider.transform.position.x),
      Math.abs(position.y - collider.transform.position.y)
    );

    if (
      distance.x > collider.width  / 2 + this.radius ||
      distance.y > collider.height / 2 + this.radius) {
      return false;
    }

    // Collide with edges.
    if (distance.x <= collider.width / 2 || distance.y <= collider.height / 2) {
      this.renderer.graphic.fillColor = Color.white;
      // TODO: Use bounce combine function.
      // TODO: Actually use impact angle to determine resulting velocity.
      this.rigidbody.velocity = velocity.Mul(-this.material.bounciness);
      return true;

    } else {
      sqrDistance = Math.pow(distance.x - collider.width / 2, 2) +
        Math.pow(distance.y - collider.height / 2, 2);
      // Collide with corners.
      if (sqrDistance <= this.sqrRadius) {
        this.renderer.graphic.fillColor = Color.green;
        return true;
      }
    }

    return false;
  };



  this.CircleCollide = function(collider, position, velocity) {
    var other = collider.rigidbody; // TODO: Don't assume rigidbody.

    if (Vector2.Distance(this.transform.position, other.position) > this.radius + collider.radius) {
      return false;
    }

    var delta = position.Sub(other.position);
    var d = delta.Magnitude();
    var minimumTranslationDistance =
      delta.Mul((this.radius + collider.radius - d) / d);

    var inverseMass1 = 1 / this.rigidbody.mass;
    var inverseMass2 = 1 / other.mass;

    var impact = velocity.Sub(other.velocity);
    var vn = impact.Dot(minimumTranslationDistance.Normalized());

    if (vn > 0) {
      return false; // Already moving away from each other.
    }

    var restitution = -0.75;
    var i = (-(1 + restitution) * vn) / (inverseMass1 + inverseMass2);
    var impulse = minimumTranslationDistance.Mul(i);

    this.rigidbody.velocity = this.rigidbody.velocity.Add(impulse.Mul(inverseMass1));
    other.velocity = other.velocity.Sub(impulse.Mul(inverseMass2));

    return false;
  };
});
