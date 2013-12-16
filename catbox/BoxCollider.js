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

      var delta = new Vector2(
        Math.min(0, Math.abs(a.x - b.x) - (this.width  + collider.width ) / 2),
        Math.min(0, Math.abs(a.y - b.y) - (this.height + collider.height) / 2)
      );

      if (delta.x > delta.y) {
        a.x += delta.x;
        if (Math.sign(this.rigidbody.velocity.x) != Math.sign(delta.x)) {
          this.rigidbody.velocity.x = 0;
        }
      } else {
        a.y += delta.y;
        if (Math.sign(this.rigidbody.velocity.y) != Math.sign(delta.y)) {
          this.rigidbody.velocity.y = 0;
        }
      }
      
      this.gameObject.OnCollisionStay(collider);
    }
  },
});
