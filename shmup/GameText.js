"use strict";

var GameText = Component.extend({

  goaway: false,


  Awake: function() {
    //Make new canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 480;
    this.context = this.canvas.getContext('2d');
    this.context.textAlign = 'center';
    this.context.font = "40pt '5X5-B___'";

    //Make first gradient (rainbow)
    this.grad = this.context.createLinearGradient(320, 0, 490, 0);
    this.grad.addColorStop(0, 'red');
    this.grad.addColorStop(1 / 6, '#ff8000');
    this.grad.addColorStop(2 / 6, 'yellow');
    this.grad.addColorStop(3 / 6, 'green');
    this.grad.addColorStop(4 / 6, 'aqua');
    this.grad.addColorStop(5 / 6, 'blue');
    this.grad.addColorStop(1, 'purple');

    //Make second gradient (fade in)
    this.whiteOverlay = this.context.createLinearGradient(0, 0, 0, 130);
    this.whiteOverlay.addColorStop(0, 'black');
    this.whiteOverlay.addColorStop(1, 'rgba(0,0,0,0)');

    //Make third gradient (fade out)
    this.fadeOut = this.context.createLinearGradient(0, 300, 0, 480);
    this.fadeOut.addColorStop(0, 'rgba(0,0,0,0)');
    this.fadeOut.addColorStop(1 / 2, 'black');
    this.fadeOut.addColorStop(1, 'black');

    var _this = this;
    setTimeout(function() {
      _this.goaway = true;
    }, 10000);
  },



  Update: function() {
    if (this.transform.position.y < 130) {
      this.transform.position.y = -(Math.sin(Math.PI/2+Time.realtimeSinceStartup)*131);
    }

    if (this.goaway) {
      // this.transform.position.y = 349+Math.sin(-Math.PI/2+0.5*Time.realtimeSinceStartup-5)*222.5;
      this.transform.position.y += Math.pow((this.transform.position.y-129)/200+1, 2.5); 
    }
    
    if (this.transform.position.y > 480) {
      Destroy(this.gameObject);
    }
  },



  OnGUI: function() {
    
    this.context.clearRect(0, 0, 800, 480);
    this.context.fillStyle = '#fff';

    this.context.fillText(
      "S",
      this.transform.position.x -90,
      this.transform.position.y + Math.sin(Time.realtimeSinceStartup*2)*20
    );

    this.context.fillText(
      "H",
      this.transform.position.x - 45,
      this.transform.position.y + Math.sin(Time.realtimeSinceStartup*2+1)*20
    );

    this.context.fillText(
      "M",
      this.transform.position.x,
      this.transform.position.y + Math.sin(Time.realtimeSinceStartup*2+2)*20
    );

    this.context.fillText(
      "U",
      this.transform.position.x + 45,
      this.transform.position.y + Math.sin(Time.realtimeSinceStartup*2+3)*20
    );


    this.context.fillText(
      "P",
      this.transform.position.x + 90,
      this.transform.position.y + Math.sin(Time.realtimeSinceStartup*2+4)*20
    );


    this.context.globalCompositeOperation = 'source-in';
    this.context.fillStyle = this.grad;
    this.context.fillRect(this.transform.position.x-120, this.transform.position.y-100, 240, 400);

    this.context.fillStyle = this.whiteOverlay;
    this.context.globalCompositeOperation = 'source-atop';
    this.context.fillRect(this.transform.position.x-120, this.transform.position.y-100, 240, 400);

    this.context.fillStyle = this.fadeOut;
    this.context.globalCompositeOperation = 'destination-out';
    this.context.fillRect(this.transform.position.x-120, this.transform.position.y-100, 240, 400);

    window.context.drawImage(this.canvas, 0, 0);

    this.context.globalCompositeOperation = 'source-over';
  }
});
