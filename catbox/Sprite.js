"use strict";

var Sprite = Component.extend({
  period: 1,
  delay: 1,
  start: 0,
  end: 0,
  runonce: false,
  current: 0,



  Update: function() {
    this.delay -= Time.deltaTime;
    if (this.delay < 0) {
      ++this.current;
      this.delay += this.period/(this.end-this.start + 1);
    }

    if (this.current > this.end) {
      this.current -= this.end - this.start + 1;
    }
  },


  
  Render: function() {
    if (this.images && this.images[this.current]) {
      context.drawImage(this.images[this.current], -this.images[this.current].width / 2, -this.images[this.current].height / 2);
    }
  },



  Load: function(src, columns, rows) {
    this.image = Resources.Load(src);
    this.images = [];

    columns = columns || 1;
    rows = rows || 1;

    var _this = this;
    _this.Chop(columns, rows);
  },



  Chop: function(columns, rows) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    canvas.width = this.image.width / columns;
    canvas.height = this.image.height / rows;

    for (var row = 0; row < rows; ++row) {
      for (var column = 0; column < columns; ++column) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(this.image, -column*canvas.width, -row*canvas.height);
        var image = new Image();
        image.src = canvas.toDataURL();
        this.images.push(image);
      }
    }
  },



  Animate: function(start, end, runonce) {
    this.start = this.current = start; 
    this.end = end;
    this.runonce = runonce;
  } 
});
