"use strict";

var GameText = Component.extend({

  awoken: false,


  Awake: function() {
    var _this = this;
    setTimeout(function() {
      _this.awoken = true;
    }, 100);
  },



  Update: function() {
    if (this.awoken && this.transform.position.y < 130) {
      
      this.transform.position.y += 1;
    }
  },

  OnGUI: function() {
    context.fillStyle = '#fff';
    context.textAlign = 'center';
    context.font = '40pt Arial';
    context.fillText(
      "LULZWARS",
      this.transform.position.x,
      this.transform.position.y
    );
  }
});
