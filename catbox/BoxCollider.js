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



  PhysicsUpdate: function() {
    if (!this.rigidbody) {
      return;
    }

    var a = new Rect(
      this.transform.position.x - this.width  / 2,
      this.transform.position.y - this.height / 2,
      this.width, this.height
    );

    for (var i in Engine.gameObjects) {
      // Discard self.
      var gameObject = Engine.gameObjects[i];
      if (gameObject === this.gameObject) {
        continue;
      }

      // Discard non-box-box collision.
      var collider = gameObject.collider;
      if (!(collider instanceof BoxCollider)) {
        continue;
      }

      // Discard on axis separation.
      var b = new Rect(
        gameObject.transform.position.x - collider.width  / 2,
        gameObject.transform.position.y - collider.height / 2,
        collider.width, collider.height
      );
      if (a.max.x < b.min.x || 
          a.min.x > b.max.x ||
          a.max.y < b.min.y || 
          a.min.y > b.max.y) {
        continue;
      }

      // Determine overlap.
      var top    = a.min.y - b.max.y;
      var right  = a.max.x - b.min.x;
      var bottom = a.max.y - b.min.y;
      var left   = a.min.x - b.max.x;
      var x = -left < right ? left : right;
      var y = bottom < -top ? bottom : top;

      // Correct collision.
      if (Math.abs(x) < Math.abs(y)) {
        this.rigidbody.velocity.x *= 0.875;
        if (gameObject.rigidbody) {
          x /= 2;
          this.rigidbody.AddForce(Vector2.left.Mul(x * 16));
        }
        this.transform.position.x -= x;

      } else {
        this.rigidbody.velocity.y *= 0.875;
        if (gameObject.rigidbody) {
          y /= 2;
          this.rigidbody.AddForce(Vector2.up.Mul(y * 16));
        }
        this.transform.position.y -= y;
      }


      this.gameObject.OnCollisionStay(collider);
    }
  },
});
