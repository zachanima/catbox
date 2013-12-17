"use strict";

var Input = {
  keys:     new Array(256),
  keyDowns: new Array(256),
  keyUps:   new Array(256),
  mousePosition: Vector2.zero,
  mouseButtons: [false, false, false],
  mouseButtonDowns: [false, false, false],
  mouseButtonUps: [false, false, false],



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

    canvas.addEventListener('mousemove' function(event) {
      var rect = canvas.getBoundingClientRect();
      Input.mousePosition.x = event.clientX - rect.left;
      Input.mousePosition.y = event.clientY - rect.top;
    });

    canvas.addEventListener('mousedown', function(event) {
      var rect = canvas.getBoundingClientRect();
      Input.mousePosition.x = event.clientX - rect.left;
      Input.mousePosition.y = event.clientY - rect.top;
      Input.mouseButtons[event.button] = true;
      Input.mouseButtonDowns[event.button] = true;
    });

    canvas.addEventListener('mouseup', function(event) {
      var rect = canvas.getBoundingClientRect();
      Input.mousePosition.x = event.clientX - rect.left;
      Input.mousePosition.y = event.clientY - rect.top;
      Input.mouseButtons[event.button] = false;
      Input.mouseButtonUps[event.button] = true;
    });
  },



  Update: function() {
    for (var i = 0; i < 256; ++i) {
      Input.keyDowns[i] = Input.keyUps[i] = false;
    }
    for (var i = 0; i < 3; ++i) {
      Input.mouseButtonDowns[i] = Input.mouseButtonUps[i] = false;
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
  },

  

  GetMouseButton: function(button) {
    return Input.mouseButtons[button];
  },



  GetMouseButtonUp: function(button) {
    return Input.mouseButtonUps[button];
  },



  GetMouseButtonDown: function(button) {
    return Input.mouseButtonDowns[button];
  },
};
