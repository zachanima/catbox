"use strict";

var Sprite = Component.extend({
  Render: function() {
    if (this.images && this.images[0]) {
      context.drawImage(this.images[0], -this.images[0].width / 2, -this.images[0].height / 2);
    }
  },



  Load: function(src, columns, rows) {
    this.image = new Image();
    this.image.src = src;
    this.images = [];

    columns = columns || 1;
    rows = rows || 1;

    var _this = this;
    this.image.onload = function() {
      _this.Chop(columns, rows);
    }
    
  },



  Chop: function(columns, rows) {
    this.images = []; 
    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    canvas.width = this.image.width / columns;
    canvas.height = this.image.height / rows;
    for (var row = 0; row < rows; ++row) {
      for (var column = 0; column < columns; ++column) {
        context.drawImage(this.image, column*canvas.width, row*canvas.height);
        var image = new Image();
        image.src = canvas.toDataURL();
        this.images.push(image);
      }
    }
  }
});
