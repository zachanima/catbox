"use strict";

var Transform = Component.extend({
  rotation: 0,



  init: function() {
    this.position = new Vector2(0, 0);
    this.scale = new Vector2(1, 1);
  },
});
