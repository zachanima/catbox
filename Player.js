"use strict";

var Player = Component.extend({ 
  Awake: function() {
    this.Add(Sprite).Load('res/mario.png');
    this.transform.position = new Vector2(300, 180);
    this.Add(Rigidbody);
    this.Add(BoxCollider);
  }
});
