"use strict";

var Sprite = Renderer.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.period = 1;
    this.delay = 1;
    this.start = 0;
    this.end = 0;
    this.runonce = false;
    this.current = 0;
  };



  this.Update = function() {
    this.delay -= Time.deltaTime;
    if (this.delay < 0) {
      ++this.current;
      this.delay += this.period/(this.end-this.start + 1);
    }

    if (this.current > this.end) {
      this.current -= this.end - this.start + 1;
    }
  };


  
  this.Render = function() {
    if (this.images && this.images[this.current]) {
      context.drawImage(this.images[this.current], -this.images[this.current].width / 2, -this.images[this.current].height / 2);
    }
  };



  this.Load = function(src, columns, rows) {
    this.image = Resources.Load(src);
    this.images = [];

    columns = columns || 1;
    rows = rows || 1;

    this.Chop(columns, rows);
  };



  this.Chop = function(columns, rows) {
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
  };



  this.Animate = function(start, end, runonce) {
    this.start = this.current = start; 
    this.end = end;
    this.runonce = runonce;
  };
});
