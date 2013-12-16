"use strict";

var Vector2 = Class.extend({
  init: function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  },



  Add: function(vector2) {
    return new Vector2(this.x + vector2.x, this.y + vector2.y);
  },



  Mul: function(scalar) {
    return new Vector2(this.x * scalar, this.y * scalar);
  },
});



Vector2.__defineGetter__('zero', function() { return new Vector2(0, 0); });
Vector2.__defineGetter__('one', function() { return new Vector2(1, 1); });
Vector2.__defineGetter__('left', function() { return new Vector2(-1, 0); });
Vector2.__defineGetter__('right', function() { return new Vector2(1, 0); });
Vector2.__defineGetter__('up', function() { return new Vector2(0, -1); });
Vector2.__defineGetter__('down', function() { return new Vector2(0, 1); });
