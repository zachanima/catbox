"use strict";

var Enemy = Component.extend({
 
  Awake: function() {
  this.transform.position.y = 10;
  this.Add(BoxCollider);
  },



  Update: function() {
    this.transform.position.x = 400+Math.sin((Math.PI * Time.realtimeSinceStartup) / 5 + Math.PI/2)*(400-this.sprite.image.width/2);
    this.transform.position.y += 0.2; 
  },



  OnCollisionEnter: function() {
    console.log('hit!');
  },

});
