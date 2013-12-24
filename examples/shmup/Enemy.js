"use strict";

var Enemy = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };



  this.Awake = function() {
    this.seed = Math.random() * 200000000;
  },



  this.Update = function() {
    this.transform.position.x = 200*Noise.Sin(this.seed + Time.realtimeSinceStartup * 5, 6);
    this.transform.position.y += 1 + 2 * Noise.Sin(this.seed / 3249805 + Time.realtimeSinceStartup * 2, 6);
  };



  this.OnCollisionEnter = function() {
    Destroy(this.gameObject);
    console.log('hit');
  };
});
