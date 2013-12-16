"use strict";

var Rect = Class.extend({
  init: function(x, y, width, height) {
    this.position = new Vector2(x, y);
    this.width = width;
    this.height = height;
    var _this = this;
    this.__defineGetter__('min', function() { return _this.position; });
    this.__defineGetter__('max', function() {
      return new Vector2(x + width, y + height);
    });
  }
});
