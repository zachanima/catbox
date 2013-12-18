"use strict";

var Camera = Component.extend({
});



Camera.__defineGetter__('main', function() {
  return GameObject.FindObjectOfType(Camera);
});
