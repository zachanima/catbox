"use strict";

var Laser = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };

  

  this.Update = function() {
    this.transform.position.y -= 10;

    if (this.transform.position.y < -800) {
      Destroy(this.gameObject);
    }
  };
});
