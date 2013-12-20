"use strict";

var Enemy = Component.extend({
  Awake: function() {
    this.transform.position.y = 10;
    this.gameObject.layer = 1;
    this.gameObject.Add(Rigidbody);
    this.rigidbody.useGravity = false;
    this.gameObject.Add(BoxCollider);
    this.collider.layers = [1];
  },



  Update: function() {
    this.transform.position.x = 400+Math.sin((Math.PI * Time.realtimeSinceStartup) / 5 + Math.PI/2)*(400-this.sprite.image.width/2);
    this.transform.position.y += 0.2; 
  },



  OnCollisionEnter: function() {
    console.log('hit!');
  },

});
