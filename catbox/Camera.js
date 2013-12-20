"use strict";

var Camera = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); }
});



Camera.__defineGetter__('main', function() {
  return GameObject.FindObjectOfType(Camera);
});
