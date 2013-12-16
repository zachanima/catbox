"use strict";

var Sprite = Component.extend({
  Render: function() {
    context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
  },



  Load: function(src) {
    this.image = new Image();
    this.image.src = src;
  },
});
