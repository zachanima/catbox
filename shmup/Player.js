"use strict";

var Player = Component.extend({
  
  awoken: false,


  Awake: function() {
    var _this = this;
    setTimeout(function() {
      _this.awoken = true;
    }, 5000);
    this.transform.position.x = 400;
    this.transform.position.y = 400;
    this.Add(Rigidbody);
    this.Add(BoxCollider);
  },
  


  Update: function() {
    if (Input.GetKey(KeyCode.LeftArrow)) {
      this.transform.position.x -= 5;
    }

    if (Input.GetKey(KeyCode.RightArrow)) {
      this.transform.position.x += 5;
    }
  },
  
  OnGUI: function() {
    if (this.awoken) {
      context.fillStyle = '#fff';
      context.textAlign = 'center';
      context.font = '40pt Arial';
      context.fillText("hai thar", 400, 200);
    }
  }

});
