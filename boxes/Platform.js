"use strict";

var Platform = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };



  this.Awake = function() {
    this.lifetime = 0;
  };



  this.Update = function() {
    this.transform.position.x = 400;
    this.transform.position.y = 480 + 120 * Math.sin(this.lifetime);
    this.lifetime += Time.deltaTime;
  };
});
