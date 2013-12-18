"use strict";

var Player = Component.extend({
  Update: function() {
    if (Input.GetKeyDown(KeyCode.Q)) {
      var grenade = new GameObject('Grenade', Grenade);
      grenade.rigidbody.AddForce(Vector2.left.Mul(100));
      grenade.rigidbody.AddForce(Vector2.up.Mul(50));
      grenade.transform.position.x = this.transform.position.x - 16;
      grenade.transform.position.y = this.transform.position.y;
      
    }

    if (Input.GetKeyDown(KeyCode.E)) {
      var pc = GameObject.FindObjectsOfType(PixelCollider)[0];
      pc.SubtractMask(
        'res/32circle.png',
        this.transform.position.x - pc.transform.position.x + pc.canvas.width / 2 + 20,
        this.transform.position.y - pc.transform.position.y + pc.canvas.height / 2  
      );
    }

    if (Input.GetKeyDown(KeyCode.S)) {
      var pc = GameObject.FindObjectsOfType(PixelCollider)[0];
      pc.SubtractMask(
        'res/32circle.png',
        this.transform.position.x - pc.transform.position.x + pc.canvas.width / 2 ,
        this.transform.position.y - pc.transform.position.y + pc.canvas.height / 2 + 20 
      );
    }

    if (Input.GetKey(KeyCode.LeftArrow)) {
      this.rigidbody.AddForce(Vector2.left.Mul(2));
    }

    if (Input.GetKey(KeyCode.RightArrow)) {
      this.rigidbody.AddForce(Vector2.right.Mul(2));
    }
  },
});
