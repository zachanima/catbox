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

    for (var i in Engine.gameObjects) {
      var gameObject = Engine.gameObjects[i];
      var collider = gameObject.collider;
      var rigidbody = gameObject.rigidbody;
      
      // Discard non-box-box collision.
      if (gameObject === this.gameObject || !(collider instanceof BoxCollider)) {
        continue;
      }

      // Discard on axis separation.
      var a = this.transform.position;
      var b = gameObject.transform.position;
      if (a.x + this.width  / 2 < b.x - collider.width  / 2 || 
          a.x - this.width  / 2 > b.x + collider.width  / 2 ||
          a.y + this.height / 2 < b.y - collider.height / 2 || 
          a.y - this.height / 2 > b.y + collider.height / 2) {
        continue;
      }

      var amin = new Vector2(a.x - this.width / 2, a.y - this.height / 2);
      var amax = new Vector2(a.x + this.width / 2, a.y + this.height / 2);
      var bmin = new Vector2(b.x - collider.width / 2, b.y - collider.height / 2);
      var bmax = new Vector2(b.x + collider.width / 2, b.y + collider.height / 2);

      var bottom = amax.y - bmin.y;
      var top = amin.y - bmax.y;
      var left = amin.x - bmax.x;
      var right = amax.x - bmin.x;

      var x = Math.abs(left) < Math.abs(right) ? left : right;
      var y = Math.abs(bottom) < Math.abs(top) ? bottom : top;

      if (Math.abs(x) < Math.abs(y)) {
        if (rigidbody) {
          a.x -= x / 2;
          this.rigidbody.velocity.x *= 0.875;
          this.rigidbody.AddForce(Vector2.left.Mul(x * 8));
        } else {
          a.x -= x;
          this.rigidbody.velocity.x *= 0.875;
        }
      } else {
        if (rigidbody) {
          a.y -= y / 2;
          this.rigidbody.velocity.y *= 0.875;
          this.rigidbody.AddForce(Vector2.up.Mul(y * 8));
        } else {
          a.y -= y;
          this.rigidbody.velocity.y *= 0.875;
        }
      }


      this.gameObject.OnCollisionStay(collider);
    }
  },
});
