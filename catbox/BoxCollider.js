"use strict";

var BoxCollider = Collider.extend({
  colliders: [],



  Update: function() { 
    if (this.sprite && this.sprite.images[0] && this.width == 1 && this.height == 1) {
      this.width = this.sprite.images[0].width;
      this.height = this.sprite.images[0].height;
    }
  },



  // FIXME: Debug.
  Render: function() {
    context.strokeRect(parseInt(-this.width / 2) - 0.5, parseInt(-this.height / 2) - 0.5, this.width, this.height);
  },



  SimulatePhysics: function() {
    if (!this.rigidbody) {
      return;
    }

    var a = new Rect(
      this.transform.position.x - this.width  / 2,
      this.transform.position.y - this.height / 2,
      this.width, this.height
    );

    for (var i = Engine.colliders.length; i--;) {
      var collider = Engine.colliders[i];

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

      if (collider instanceof BoxCollider) {

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


      } else if (collider instanceof PixelCollider) {

        if (!collider.canvas || collider.canvas.width == 0) {
          continue;
        }

        // Correct collision.
        var iteration = 0; // Solver iterations.
        var overlap = 0;
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        var context = canvas.getContext('2d');
        var collision = false;
        var offsets = [Vector2.up, Vector2.down, Vector2.left, Vector2.right];

        context.globalCompositeOperation = 'copy';
        context.drawImage(
          collider.canvas,
          collider.transform.position.x - collider.canvas.width / 2 - this.transform.position.x + this.width / 2,
          collider.transform.position.y - collider.canvas.height / 2 - this.transform.position.y + this.height / 2
        );
        context.globalCompositeOperation = 'destination-in';
        context.fillRect(0, 0, this.width, this.height);

        var data = context.getImageData(0, 0, canvas.width, canvas.height).data;
        for (var j = 3; j < data.length; j += 4) {
          if (data[j] > 0) {
            overlap++;
          }
        }

        var index = -1;
        for (var j = this.colliders.length; j--;) {
          if (this.colliders[j] === collider) {
            index = j;
            break;
          }
        }

        if (overlap > 0) {
          this.gameObject.OnCollisionStay(collider);
          if (index == -1) {
            this.colliders.push(collider);
            this.gameObject.OnCollisionEnter(collider);
          }
        } else {
          if (index > -1) {
            this.colliders.splice(index, 1);
            this.gameObject.OnCollisionExit(collider);
          }
        }

        while (overlap > 0 && iteration < 16) {
          var offset = Vector2.zero;
          overlap = this.width * this.height;

          for (var j = 0; j < 4; ++j) {
            context.globalCompositeOperation = 'copy';
            context.drawImage(
              collider.canvas,
              -offsets[j].x * 0.5 + collider.transform.position.x - collider.canvas.width / 2 - this.transform.position.x + this.width / 2,
              -offsets[j].y * 0.5 + collider.transform.position.y - collider.canvas.height / 2 - this.transform.position.y + this.height / 2
            );
            context.globalCompositeOperation = 'destination-in';
            context.fillRect(0, 0, this.width, this.height);

            var data = context.getImageData(0, 0, canvas.width, canvas.height).data;
            var thisOverlap = 0;
            for (var k = 3; k < data.length; k += 4) {
              if (data[k] > 0) {
                thisOverlap++;
              }
            }

            if (thisOverlap < overlap) {
              overlap = thisOverlap;
              offset = offsets[j].Mul(0.5);
            }
          }

          this.transform.position = this.transform.position.Add(offset);

          if (overlap == 0) {
            this.rigidbody.velocity.y *= 1 - Math.abs(offset.y);
            break;
          }

          ++iteration;
        }
      }
    }
  },
});
