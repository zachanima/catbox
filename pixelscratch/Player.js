"use strict";

var Player = Component.extend({
  Awake: function() {
    this.shovel = new Circle(32);
  },



  Update: function() {
    if (Input.GetKeyDown(KeyCode.Q)) {
      var pc = GameObject.FindObjectsOfType(PixelCollider)[0];
      pc.SubtractMask(
        this.shovel,
        this.transform.position.x - pc.transform.position.x + pc.canvas.width / 2,
        this.transform.position.y - pc.transform.position.y + pc.canvas.height / 2 + 12
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
