"use strict";

var Rain = Component.extend({
  Update: function() {
    this.transform.position.x = Math.random() * canvas.width;
  },
});
