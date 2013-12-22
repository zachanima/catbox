"use strict";

var Enemy2 = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };

  this.Awake = function() {
    this.transform.position.y = 10;
    this.transform.position.x = 400;
    this.transform.rotation = Math.PI/2;
  };


  this.Update = function() {
  };
});
