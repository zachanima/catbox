"use strict";

var Color = Object.augment(function() {
  this.constructor = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a || 255;
  };



  this.toString = function() {
    return 'rgba(' + parseInt(this.r) + ', ' + parseInt(this.g) + ', ' + parseInt(this.b) + ', ' + parseInt(this.a) + ')';
  };
});



// TODO: Use Object.defineProperty.
Color.__defineGetter__('red', function() { return new Color(255, 0, 0); });
Color.__defineGetter__('green', function() { return new Color(0, 255, 0); });
Color.__defineGetter__('blue', function() { return new Color(0, 0, 255); });
Color.__defineGetter__('black', function() { return new Color(0, 0, 0); });
Color.__defineGetter__('white', function() { return new Color(255, 255, 255); });

Color.Lerp = function(a, b, w) {
  return new Color(
    a.r * (1 - w) + b.r * w,
    a.g * (1 - w) + b.g * w,
    a.b * (1 - w) + b.b * w,
    a.a * (1 - w) + b.a * w
  );
};
