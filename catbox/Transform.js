"use strict";

var Transform = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.rotation = 0;
    this.position = new Vector2(0, 0);
    this.scale = new Vector2(1, 1);
  };
});
