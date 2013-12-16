"use strict";

var KeyCode = {
  Space: 32,
  A: 65,
  B: 66,
  C: 67,
  D: 68
}



var Input = {
  keys:     new Array(256),
  keyDowns: new Array(256),
  keyUps:   new Array(256),



  init: function() {
    for (var i = 0; i < 256; ++i) {
      Input.keys[i] = Input.keyDowns[i] = Input.keyUps[i] = false;
    }

    window.addEventListener("keydown", function(event) {
      Input.keyDowns[event.keyCode] = !Input.keys[event.keyCode];
      Input.keys[event.keyCode] = true;
    });

    window.addEventListener("keyup", function(event) {
      Input.keys[event.keyCode] = false;
      Input.keyUps[event.keyCode] = true;
    });
  },



  Update: function() {
    for (var i = 0; i < 256; ++i) {
      Input.keyDowns[i] = Input.keyUps[i] = false;
    }
  },



  GetKey: function(keyCode) {
    return Input.keys[keyCode];
  },



  GetKeyDown: function(keyCode) {
    return Input.keyDowns[keyCode];
  },



  GetKeyUp: function(keyCode) {
    return Input.keyUps[keyCode];
  }
};
