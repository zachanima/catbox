"use strict";

var BoxCollider = Collider.extend({
  width: 1,
  height: 1,



  Awake: function() { 
    if (this.sprite) {
      this.width = this.sprite.image.width;
      this.height = this.sprite.image.height;
    }
  },



  Update: function() {
    // Only check for collision when a rigidbody is also attached.
    if (this.rigidbody) {
      var _this = this;

      Engine.gameObjects.forEach(function(gameObject) {
        var collider = gameObject.collider;
        if (gameObject !== _this.gameObject && collider) {
          
          // Box-Box collision.
          if (collider instanceof BoxCollider) {
            if (_this.Overlaps(collider)) {
              var position = _this.transform.position;

              if (
                Math.abs(position.x - gameObject.transform.position.x) < 1 &&
                Math.abs(position.y - gameObject.transform.position.y) < 1
              ) {
                var displacementAngle = Math.random() * 2.0 * Math.PI;
                position.x += Math.cos(displacementAngle);
                position.y += Math.sin(displacementAngle);
              }


              var delta = new Vector2(
                position.x - gameObject.transform.position.x,
                position.y - gameObject.transform.position.y
              );
              var depth = new Vector2(
                Math.abs(delta.x) - Math.floor((_this.width + collider.width) / 2),
                Math.abs(delta.y) - Math.floor((_this.height + collider.height) / 2)
              );

              _this.gameObject.OnCollisionStay(collider);

              if (gameObject.rigidbody) {
                var force = new Vector2(-depth.x * Math.sign(delta.x), -depth.y * Math.sign(delta.y));
                _this.rigidbody.velocity.x *= 0.9375;
                _this.rigidbody.velocity.y *= 0.99;
                _this.rigidbody.AddForce(force.Mul(gameObject.rigidbody.mass * Time.deltaTime));
                if (depth.x > depth.y) {
                  position.x -= depth.x * Math.sign(delta.x) / 2;
                } else {
                  position.y -= depth.y * Math.sign(delta.y) / 2;
                }
              }  else {
                if (depth.x > depth.y) {
                  position.x -= depth.x * Math.sign(delta.x);
                } else {
                  position.y -= depth.y * Math.sign(delta.y);
                  _this.rigidbody.velocity.y = 0;
                }
              }
            }
          }
        }
      });
    }
  },



  Contains: function(vector2) {
    if (
      vector2.x > this.transform.position.x - this.width / 2 &&
      vector2.x < this.transform.position.x + this.width / 2 &&
      vector2.y > this.transform.position.y - this.height / 2 &&
      vector2.y < this.transform.position.y + this.height / 2
    ) {
      return true;
    }

    return false;
  },



  Overlaps: function(boxCollider) {
    var position = boxCollider.transform.position;
    var width = boxCollider.width;
    var height = boxCollider.height;
    if (
      this.Contains(new Vector2(position.x - width / 2, position.y - height / 2)) ||
      this.Contains(new Vector2(position.x - width / 2, position.y + height / 2)) ||
      this.Contains(new Vector2(position.x + width / 2, position.y - height / 2)) ||
      this.Contains(new Vector2(position.x + width / 2, position.y + height / 2)) ||
      boxCollider.Contains(new Vector2(this.transform.position.x - this.width / 2, this.transform.position.y - this.height / 2)) ||
      boxCollider.Contains(new Vector2(this.transform.position.x - this.width / 2, this.transform.position.y + this.height / 2)) ||
      boxCollider.Contains(new Vector2(this.transform.position.x + this.width / 2, this.transform.position.y - this.height / 2)) ||
      boxCollider.Contains(new Vector2(this.transform.position.x + this.width / 2, this.transform.position.y + this.height / 2))
    ) {
      return true;
    }

    return false;
  },
});
