"use strict";

var Player = Component.extend({ 
  Awake: function() {
    this.Add(Sprite).Load('res/mario.png');
    this.sprite.image;
    this.transform.position = new Vector2(300, 180);
    this.Add(Rigidbody);
    this.Add(BoxCollider);
  },



  Update: function() {
    if (Input.GetKey(KeyCode.LeftArrow)) {
      this.transform.scale.x = -1;
      this.rigidbody.velocity.x = -100;
    }
    else if (Input.GetKey(KeyCode.RightArrow)) {
      this.transform.scale.x = 1;
      this.rigidbody.velocity.x = 100;
    }
    else {
    this.rigidbody.velocity.x = 0;
    }
  },
});
