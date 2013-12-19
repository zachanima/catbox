"use strict";

var Enemy = Component.extend({
 
  Awake: function() {
    this.transform.position.y = 10;
    this.gameObject.layer = 1;
    this.Add(Rigidbody);
    this.rigidbody.useGravity = false;
    this.Add(BoxCollider);
  },



  Update: function() {
    this.transform.position.x = 400+Math.sin((Math.PI * Time.realtimeSinceStartup) / 5 + Math.PI/2)*(400-this.sprite.image.width/2);
    this.transform.position.y += 0.2; 
  }
});
