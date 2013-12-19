"use strict";

var Collider = Component.extend({
  width: 1,
  height: 1,
  layers: [0],



  GetBounds: function() {
    return new Rect(
      this.transform.position.x - this.width  / 2,
      this.transform.position.y - this.height / 2,
      this.width, this.height
    );
  },
});
