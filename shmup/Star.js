"use strict";

var Star = Component.extend({
  Awake: function() {
    this.transform.position.x = Math.ceil(Math.random() * 800) + 0.25;
    this.transform.position.y += Math.random() * 480;
    this.vel = 0.6 + Math.random() * 3;
  },



  Update: function() { 
    if (this.transform.position.y > canvas.height) {
      this.transform.position.y -= 480 + Math.random() * 2000;
    }
    this.transform.position.y += this.vel;
  },
});
