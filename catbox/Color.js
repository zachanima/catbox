"use strict";

var Color = Object.augment(function() {
  this.constructor = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a || 1;
  };



  this.toString = function() {
    return 'rgba(' + parseInt(this.r) + ', ' + parseInt(this.g) + ', ' + parseInt(this.b) + ', ' + this.a + ')';
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
    Mathf.Lerp(a.r, b.r, w),
    Mathf.Lerp(a.g, b.g, w),
    Mathf.Lerp(a.b, b.b, w),
    Mathf.Lerp(a.a, b.a, w)
  );
};
