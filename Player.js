"use strict";

var Player = Component.extend({ 
  grounded: false,



  Awake: function() {
    this.Add(Sprite).Load('res/mario.png');
    this.sprite.period = 0.7;
    this.transform.position = new Vector2(300, 180);
    this.Add(Rigidbody);
    this.Add(BoxCollider);
    this.rigidbody.mass = 1;
  },



  Update: function() {
    // Camera.main.transform.position = this.transform.position;

    this.rigidbody.velocity.x = 0;

    if (Input.GetKey(KeyCode.LeftArrow)) {
      this.transform.scale.x = -1;
      this.rigidbody.velocity.x -= 100;
    }
    
    if (Input.GetKey(KeyCode.RightArrow)) {
      this.transform.scale.x = 1;
      this.rigidbody.velocity.x += 100;
    } 

    if ((Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.UpArrow)) &&
      this.grounded) {
      this.rigidbody.velocity.y = 0;
      this.rigidbody.AddForce(Vector2.up.Mul(200 * this.rigidbody.mass));
    }

    this.grounded = false;
  },



  OnCollisionStay: function(collider) {
    if (collider.transform.position.y + collider.height >= this.transform.position.y) {
      this.grounded = true;
    }
  },
});
