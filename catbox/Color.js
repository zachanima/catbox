"use strict";

var Color = Class.extend({
  init: function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a || 255;
  },
});



Color.__defineGetter__('red', function() { return new Color(255, 0, 0); });
Color.__defineGetter__('green', function() { return new Color(0, 255, 0); });
Color.__defineGetter__('blue', function() { return new Color(0, 0, 255); });
Color.__defineGetter__('black', function() { return new Color(0, 0, 0); });
Color.__defineGetter__('white', function() { return new Color(255, 255, 255); });
