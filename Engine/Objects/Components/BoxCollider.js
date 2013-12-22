"use strict";

var BoxCollider = Collider.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.colliders = [];
    this.isTrigger = false;
    this.center = Vector2.zero;
    this.size = Vector2.one;
  };



  this.Awake = function() {
    // Canvas and context for pixel collision.
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.bounds = this.GetBounds();

    // TODO: Use renderer.bounds.size instead of sprite.width.
    if (this.sprite && this.sprite.images[0] && this.size.x == 1 && this.size.y == 1) {
      this.size = this.sprite && new Vector2(this.sprite.images[0].width, this.sprite.images[0].height) || this.size;
    }
  };



  this.Update = function() { 
    if (this.sprite && this.sprite.images[0] && this.width == 1 && this.height == 1) {
      this.width = this.sprite.images[0].width;
      this.height = this.sprite.images[0].height;
    }

    this.size.x = this.width;
    this.size.y = this.height;
  };



  // FIXME: Debug.
  this.Render = function() {
    context.strokeRect(parseInt(-this.width / 2) - 0.5, parseInt(-this.height / 2) - 0.5, this.width, this.height);
  };



  // Bounding box is already assumed to be overlapping.
  this.Detect = function() { return true; };



  // TODO: Don't assume BoxCollider.
  this.Respond = function(collider) {
    var normal = null; 
    var penetration = null;

    var other = (collider.rigidbody || collider.transform);
    var n = other.position.Sub(this.rigidbody.position);
    var aExtent = this.size.x / 2;
    var bExtent = collider.size.x / 2;

    var xOverlap = aExtent + bExtent - Math.abs(n.x);

    if (xOverlap > 0) {
      aExtent = this.size.y / 2;
      bExtent = collider.size.y / 2;

      var yOverlap = aExtent + bExtent - Math.abs(n.y);

      if (yOverlap > 0) {
        if (xOverlap < yOverlap) {
          if (n.x < 0) {
            normal = Vector2.left;
          } else {
            normal = Vector2.right; // Or zero?
          }
          penetration = xOverlap;

        } else {
          if (n.y > 0) {
            normal = Vector2.down;
          } else {
            normal = Vector2.up;
          }
          penetration = yOverlap;
        }

        // Resolve.
        var rv = (other.velocity || Vector2.zero).Sub(this.rigidbody.velocity);
        var velAlongNormal = rv.Dot(normal);

        if (velAlongNormal > 0) {
          return;
        }

        var e = 0.9375; // Restitution. TODO: Use object's restitution.

        var j = -(1 + e) * velAlongNormal;
        var totalInverseMass = 1 / this.rigidbody.mass + (collider.rigidbody ? 1 / collider.rigidbody.mass : 0);
        j /= 1 / this.rigidbody.mass + (collider.rigidbody ? 1 / collider.rigidbody.mass : 0);

        // Apply impulse.
        var impulse = normal.Mul(j);
        this.rigidbody.velocity = this.rigidbody.velocity.Add(impulse.Mul(-1 / this.rigidbody.mass));

        if (collider.rigidbody) {
          collider.rigidbody.velocity = collider.rigidbody.velocity.Add(impulse.Mul(1 / collider.rigidbody.mass));
        }

        var percent = 0.8;
        var slop = 0.01;
        var correction = normal.Mul((Math.max(penetration - slop, 0) / totalInverseMass) * percent);
        this.transform.position = this.transform.position.Sub(correction.Mul(1 / this.rigidbody.mass));
        if (collider.rigidbody) {
          collider.transform.position = collider.transform.position.Add(correction.Mul(1 / collider.rigidbody.mass));
        }
      }
    }
  };



  this.SimulatePhysics = function() {
    this.bounds = this.GetBounds();

    if (!this.rigidbody) {
      return;
    }

    var a = this.bounds;

    for (var i = Engine.colliders.length; i--;) {
      var collider = Engine.colliders[i];

      // Discard self.
      if (this.gameObject === collider.gameObject) {
        continue;
      }

      // Discard uninitialized colliders.
      if (!collider.bounds) {
        continue;
      }

      // Discard unmasked layers.
      var unmasked = true;
      for (var j = this.layers.length; j--;) {
        if (collider.layers[j] == this.gameObject.layer) {
          unmasked = false;
          break;
        }
      }
      if (unmasked) {
        continue;
      }

      var index = -1;
      for (var j = this.colliders.length; j--;) {
        if (this.colliders[j] === collider) {
          index = j;
          break;
        }
      }

      // Discard on axis separation.
      var b = collider.bounds;
      if (a.max.x < b.min.x || 
          a.min.x > b.max.x ||
          a.max.y < b.min.y || 
          a.min.y > b.max.y) {
        if (index > -1) {
          this.colliders.splice(index, 1);
          this.gameObject.SendMessage('OnCollisionExit', collider);
        }
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

        this.bounds = this.GetBounds();

        // Correct collision.
        if (Math.abs(x) < Math.abs(y) && !this.isTrigger) {
          this.rigidbody.velocity.x *= 0.875;
          if (collider.rigidbody) {
            x /= 2;
            this.rigidbody.AddForce(Vector2.left.Mul(x * 4));
          }
          this.transform.position.x -= x;

        } else if (!this.isTrigger) {
          this.rigidbody.velocity.y *= 0.875;
          if (collider.rigidbody) {
            y /= 2;
            this.rigidbody.AddForce(Vector2.up.Mul(y * 4));
          }
          this.transform.position.y -= y;
        }

        // TODO: Fire OnCollisionEnter/Exit events.
        this.gameObject.SendMessage('OnCollisionStay', collider);
        if (index == -1) {
          this.colliders.push(collider);
          this.gameObject.SendMessage('OnCollisionEnter', collider);
        }


      } else if (collider instanceof PixelCollider) {

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.context.globalCompositeOperation = 'copy';
        this.context.drawImage(
          collider.canvas,
          collider.transform.position.x - collider.canvas.width / 2 - this.transform.position.x + this.width / 2,
          collider.transform.position.y - collider.canvas.height / 2 - this.transform.position.y + this.height / 2
        );
        this.context.globalCompositeOperation = 'destination-in';
        this.context.fillRect(0, 0, this.width, this.height);

        var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
        var collision = false;
        for (var j = data.length - 1; j >= 0; j -= 4) {
          if (data[j] > 0) {
            this.transform.position.y -= 1;
            this.rigidbody.velocity.y = 0;
            collision = true;
            break;
          }
        }

        if (collision) {
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
      }
    }
  };
});
