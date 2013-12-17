"use strict";

var PixelCollider = Collider.extend({
    /*
  Render: function() {
    if (this.image) {
      context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    }
  },
    */



  Load: function(src) {
    this.image = new Image();
    this.image.src = src;
    this.image.onload = this.Mask();
  },



  Mask: function() {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = this.image.width;
    canvas.height = this.image.height;
    context.drawImage(this.image, 0, 0);

    this.width = canvas.width;
    this.height = canvas.height;

    var pixels = context.getImageData(0, 0, canvas.width, canvas.height);

    for (var y = 0; y < canvas.height; ++y) {
      for (var x = 0; x < canvas.width; ++x) {
        var i = (x + y * canvas.width) * 4;
        var value = pixels.data[i+3] == 0 ? 0 : 255;
        
        for (var n = 0; n < 4; ++n) {
          pixels.data[i+n] = value;
        }
      }
    }

    context.putImageData(pixels, 0, 0);

    this.image.src = canvas.toDataURL();
  },
});
