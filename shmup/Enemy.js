"use strict";

var Enemy = Component.extend({
 
  Awake: function() {
  this.transform.position.y = 10;
  },



  Update: function() {
    this.transform.position.x = 400+Math.sin(0.2*Time.realtimeSinceStartup+Math.PI/2)*(400-this.sprite.image.width/2);
    this.transform.position.y += 0.2;
  }
});
