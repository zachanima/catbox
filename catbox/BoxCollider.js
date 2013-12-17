"use strict";

var BoxCollider = Collider.extend({
  width: 1,
  height: 1,



  Update: function() { 
    if (this.sprite && this.sprite.images[0]) {
      this.width = this.sprite.images[0].width;
      this.height = this.sprite.images[0].height;
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

    var colliders = GameObject.FindObjectsOfType(BoxCollider);

    for (var i in colliders) {
      var collider = colliders[i];

      // Discard self.
      if (this.gameObject === collider.gameObject) {
        continue;
      }

      // Discard on axis separation.
      var b = new Rect(
        collider.transform.position.x - collider.width  / 2,
        collider.transform.position.y - collider.height / 2,
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
        if (collider.rigidbody) {
          x /= 2;
          this.rigidbody.AddForce(Vector2.left.Mul(x * 16));
        }
        this.transform.position.x -= x;

      } else {
        this.rigidbody.velocity.y *= 0.875;
        if (collider.rigidbody) {
          y /= 2;
          this.rigidbody.AddForce(Vector2.up.Mul(y * 16));
        }
        this.transform.position.y -= y;
      }


      this.gameObject.OnCollisionStay(collider);
    }
  },



  // FIXME: Debug.
  Render: function() {
    // context.strokeRect(parseInt(-this.width / 2) - 0.5, parseInt(-this.height / 2) - 0.5, this.width, this.height);
  },
});
