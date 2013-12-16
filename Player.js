"use strict";

var Player = Component.extend({ 
  grounded: false,
  Awake: function() {
    this.Add(Sprite).Load('res/mario.png');
    this.sprite.image;
    this.transform.position = new Vector2(300, 180);
    this.Add(Rigidbody);
    this.Add(BoxCollider);
  },



  Update: function() {
    this.rigidbody.velocity.x = 0;

    if (Input.GetKey(KeyCode.LeftArrow)) {
      this.transform.scale.x = -1;
      this.rigidbody.velocity.x -= 100;
    }
    
    if (Input.GetKey(KeyCode.RightArrow)) {
      this.transform.scale.x = 1;
      this.rigidbody.velocity.x += 100;
    } 

    if (Input.GetKeyDown(KeyCode.Space) && this.grounded) {
      this.rigidbody.AddForce(Vector2.up.Mul(200));
    }

    this.grounded = false;
  },



  OnCollisionStay: function(collider) {
    if (collider.transform.position.y >= this.transform.position.y) {
      this.grounded = true;
    }
  },
});
