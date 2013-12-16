"use strict";

var Engine = {
  gameObjects: new Array(),
  lastTimestamp: 0,



  Start: function(width, height, id) {
    // Initialize canvas.
    window.canvas = id ? document.getElementById(id) : document.getElementsByTagName('canvas')[0];
    canvas.width = width;
    canvas.height = height;

    window.context = canvas.getContext('2d');

    Input.init();

    // Request main loop.
    window.requestAnimationFrame(Engine.Run);
  },



  Run: function(timestamp) {
    Time.deltaTime = (timestamp - Engine.lastTimestamp) / 1000;
    Engine.lastTimestamp = timestamp;

    // Update.
    // Engine.FixedUpdate(); // Fixed-time update.
    Engine.PhysicsUpdate(); // Engine physics step.
    Engine.Update();
    // Engine.LateUpdate();
    // Engine.PostUpdate(); // Engine frame cleanup (input, etc.).

    // Render.
    // Engine.OnPreRender();
    Engine.Render();
    // Engine.OnPostRender();
    // Engine.OnGUI();

    // Request main loop.
    window.requestAnimationFrame(Engine.Run);
  },



  PhysicsUpdate: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.PhysicsUpdate();
    });
  },



  Update: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.Update();
    });

    Input.Update();
  },



  Render: function() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.Render();
    });
  }
};
