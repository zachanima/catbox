"use strict";

var Rect = Object.augment(function() {
  this.constructor = function(x, y, width, height) {
    this.position = new Vector2(x, y);
    this.width = width;
    this.height = height;
    this.min = this.position;
    this.max = new Vector2(x + width, y + height);
  };
});
