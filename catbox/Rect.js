"use strict";

var Rect = Class.extend({
  init: function(x, y, width, height) {
    this.position = new Vector2(x, y);
    this.width = width;
    this.height = height;

    var _this = this;

    // TODO: Make mutable *or* freeze Rect object.
    this.min = _this.position; 
    this.max = new Vector2(x + width, y + height);
  }
});
