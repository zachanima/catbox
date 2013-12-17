"use strict";

var PixelCollider = Collider.extend({
  Render: function() {
    if (this.canvas) {
      context.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2);
    }
  },



  Load: function(src) {
    var image = new Image();
    image.src = src;
    image.onload = this.Mask(image);
  },



  Mask: function(image) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.context.drawImage(image, 0, 0);
  },



  SubtractMask: function(src, x, y) {
    var _this = this;
    var image = new Image();
    image.onload = function() {
      _this.context.globalCompositeOperation = 'destination-out';
      _this.context.drawImage(image, x - image.width / 2, y - image.height / 2);
    }
    image.src = src;
  },
});
