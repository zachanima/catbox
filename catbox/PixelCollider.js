"use strict";

var PixelCollider = Collider.extend({
  Render: function() {
    if (this.canvas && this.canvas.width > 0) {
      context.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2);
    }
  },



  Load: function(src) {
    var image = new Image();
    var _this = this;
    image.onload = function() {
      _this.Mask(image);
    }
    image.src = src;
  },



  Mask: function(image) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.context.drawImage(image, 0, 0);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  },



  SubtractMask: function(shape, x, y) {
    var _this = this;
    _this.context.globalCompositeOperation = 'destination-out';
    _this.context.drawImage(shape.canvas, x - shape.canvas.width / 2, y - shape.canvas.height / 2);
  },
});
