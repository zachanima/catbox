"use strict";

var Player = Component.augment(function(base) { 
  this.constructor = function() { base.constructor.call(this) };



  this.Awake = function() {
    this.grounded = false;
    this.gameObject.AddComponent(Sprite).Load('res/mario.png');
    this.sprite.period = 0.7;
    this.transform.position = new Vector2(300, 180);
    this.gameObject.AddComponent(Rigidbody);
    this.gameObject.AddComponent(BoxCollider);
    this.rigidbody.mass = 1;
  };



  this.Update = function() {
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



  this.OnCollisionStay = function(collider) {
    // if (collider.transform.position.y + collider.height >= this.transform.position.y) {
      this.grounded = true;
    // }
  };
});
