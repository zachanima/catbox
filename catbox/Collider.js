"use strict";

var Collider = Component.extend({
  init: function() {
    this.center = new Vector2(0, 0);
  },



  Contains: function() {
    // Dummy.
    return false;
  }
});
