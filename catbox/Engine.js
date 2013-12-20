"use strict";

var Engine = {
  gameObjects: new Array(),
  colliders: new Array(),
  lastTimestamp: 0,



  Load: function(resources, callback, width, height, id) {
    // Initialize canvas.
    window.canvas = id ? document.getElementById(id) : document.getElementsByTagName('canvas')[0];
    canvas.width = width || 300;
    canvas.height = height || 150;
    window.context = canvas.getContext('2d');

    Input.init();

    Resources.callback = callback;
    Resources.loading = resources;
    Resources.Preload();

    // Request fixed loop.
    setInterval(Engine.FixedUpdate, parseInt(1000 * Time.fixedDeltaTime));

    // Request main loop.
    window.requestAnimationFrame(Engine.Run);
  },



  Run: function(timestamp) {
    Time.realtimeSinceStartup = timestamp / 1000;
    Time.deltaTime = (timestamp - Engine.lastTimestamp) / 1000;
    Engine.lastTimestamp = timestamp;

    // Update.
    // Engine.PreUpdate();
    Engine.Update();
    // Engine.LateUpdate();
    // Engine.PostUpdate(); // Engine frame cleanup (input, etc.).

    // Render.
    // Engine.OnPreRender();
    Engine.Render();
    // Engine.OnPostRender();
    Engine.OnGUI();
    // Request main loop.
    window.requestAnimationFrame(Engine.Run);
  },



  FixedUpdate: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.components.forEach(function(component)) {
        if (component.enabled) {
          component.FixedUpdate();
        }
      }
    });

    Engine.SimulatePhysics();
  },



  SimulatePhysics: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.SimulatePhysics();
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
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#000';
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
  },



  OnGUI: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.OnGUI();
    });
  }
};



// TODO: Make static method of Component.
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
