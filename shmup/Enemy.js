"use strict";

var Enemy = Component.extend({
 
  blah: Math.PI/2,

  Awake: function() {
  this.transform.position.y = 10;
  },



  Update: function() {
    this.transform.position.x = 400+Math.sin(this.blah)*(400-this.sprite.image.width/2);
    this.blah += 0.005;

    this.transform.position.y += 0.2;
  }
});
