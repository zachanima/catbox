"use strict";

var Player = Component.extend({ 
  Awake: function() {
    this.Add(Sprite).Load('turtle.png');
    this.transform.position = new Vector2(300, 180);
    this.Add(Rigidbody);
    this.Add(BoxCollider);
    this.collider.width = this.sprite.image.width;
    this.collider.height = this.sprite.image.height;
  }
});
