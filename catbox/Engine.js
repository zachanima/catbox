"use strict";

var Engine = {
  gameObjects: new Array(),
  colliders: new Array(),
  lastTimestamp: 0,



  Start: function(width, height, id) {
    // Initialize canvas.
    window.canvas = id ? document.getElementById(id) : document.getElementsByTagName('canvas')[0];
    canvas.width = width;
    canvas.height = height;

    window.context = canvas.getContext('2d');

    Input.init();

    // Request fixed loop.
    setInterval(Engine.FixedUpdate, 20);

    // Request main loop.
    window.requestAnimationFrame(Engine.Run);
  },



  Run: function(timestamp) {
    Time.deltaTime = (timestamp - Engine.lastTimestamp) / 1000;
    Engine.lastTimestamp = timestamp;

    // Update.
    // Engine.FixedUpdate(); // Fixed-time update.
    Engine.PhysicsUpdate(); // Engine physics step.
    // Engine.PreUpdate();
    Engine.Update();
    // Engine.LateUpdate();
    // Engine.PostUpdate(); // Engine frame cleanup (input, etc.).

    // Render.
    // Engine.OnPreRender();
    Engine.Render();
    // Engine.OnPostRender();
    // Engine.OnGUI();

    document.getElementById('inspector').innerHTML = '';
    document.getElementById('inspector').appendChild(Engine.gameObjects[0].Editor());

    // Request main loop.
    window.requestAnimationFrame(Engine.Run);
  },



  FixedUpdate: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.FixedUpdate();
    });
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

    document.getElementById('ms').innerHTML = parseInt(Time.deltaTime * 1000);
    document.getElementById('fps').innerHTML = parseInt(1 / Time.deltaTime);
  },



  Render: function() {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#8080ff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (Camera.main) {
      var transform = Camera.main.transform;
      context.save();
      context.translate(parseInt(-transform.position.x + canvas.width / 2), parseInt(-transform.position.y + canvas.height / 2));
      context.rotate(transform.rotation);
      context.scale(transform.scale.x, transform.scale.y);
    }

    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.Render();
    });

    if (Camera.main) {
      context.restore();
    }
  }
};



var Destroy = function(gameObject) {
  var index = Engine.gameObjects.indexOf(gameObject);
  if (index > -1) {
    Engine.gameObjects.splice(index, 1);
    for (var i in gameObject.components) {
      var component = gameObject.components[i];
      if (component instanceof Collider) {
        index = Engine.colliders.indexOf(component);
        if (index > -1) {
          Engine.colliders.splice(index, 1);
        }
      }
    }
  }
}
