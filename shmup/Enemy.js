"use strict";

var Enemy = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };



  this.Awake = function() {
    this.transform.position.y = 10;
    this.gameObject.layer = 1;
    this.gameObject.Add(Rigidbody);
    this.rigidbody.useGravity = false;
    this.gameObject.Add(BoxCollider);
    this.collider.layers = [1];
  },



  this.Update = function() {
    this.transform.position.x = 400+Math.sin((Math.PI * Time.realtimeSinceStartup) / 5 + Math.PI/2)*(400-this.sprite.image.width/2);
    this.transform.position.y += 0.2; 
  };



  this.OnCollisionEnter = function() {
    console.log('hit!');
  };
});
