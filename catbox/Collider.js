"use strict";

var Collider = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.width = 1;
    this.height = 1;
    this.layers = [0];
  };



  this.GetBounds = function() {
    return new Rect(
      this.transform.position.x - this.width  / 2,
      this.transform.position.y - this.height / 2,
      this.width, this.height
    );
  };
});
