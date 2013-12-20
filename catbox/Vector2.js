"use strict";

var Vector2 = Object.augment(function() {
  this.constructor = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };



  this.Add = function(other) {
    return new Vector2(this.x + other.x, this.y + other.y);
  };



  this.Sub = function(other) {
    return new Vector2(this.x - other.x, this.y - other.y);
  };



  this.Mul = function(scalar) {
    return new Vector2(this.x * scalar, this.y * scalar);
  };



  this.Dot = function(other) { 
    return this.x * other.x + this.y * other.y;
  };
  
  
  
  this.Div = function(scalar) {
    return new Vector2(this.x / scalar, this.y / scalar);
  };
});



// TODO: Use Object.defineProperty.
Vector2.__defineGetter__('zero', function() { return new Vector2(0, 0); });
Vector2.__defineGetter__('one', function() { return new Vector2(1, 1); });
Vector2.__defineGetter__('left', function() { return new Vector2(-1, 0); });
Vector2.__defineGetter__('right', function() { return new Vector2(1, 0); });
Vector2.__defineGetter__('up', function() { return new Vector2(0, -1); });
Vector2.__defineGetter__('down', function() { return new Vector2(0, 1); });
