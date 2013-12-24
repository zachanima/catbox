"use strict";

var Enemy2 = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };



  this.Update = function() {
    this.explosion.transform.rotation = Math.random()*2*Math.PI;
  };
});
