"use strict";

var Engine = {
  gameObjects: [],
  colliders: [],
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
  },



  Begin: function() {
    // Request fixed loop.
    setInterval(Engine.Simulate, parseInt(1000 * Time.fixedDeltaTime));

    // Request main loop.
    window.requestAnimationFrame(Engine.Run);
  },



  Run: function(timestamp) {
    // Update Time.
    Time.realtimeSinceStartup = timestamp / 1000;
    Time.deltaTime = (timestamp - Engine.lastTimestamp) / 1000;
    Engine.lastTimestamp = timestamp;

    Engine.Awake();
    Engine.Start();
    // On Enable.

    // OnApplicationPause.

    // Rigidbody interpolation for transform position, rotation.
    // On Mouse Down/Up Events.

    Engine.Update();
    // Advance animations.
    // Late Update.

    // On Pre Cull.
    // On Became Visible/Invisible.
    // On Will Render Object.
    // On Pre Render.
    Engine.Render();
    // On Render Object.
    // On Post Render.
    // On Render Image.
    Engine.OnGUI(); // TODO: Layout, Repaint, Layout, Keyboard, Mouse

    // On Destroy.
    // On Application Quit.
    // On Disable.

    // Request main loop.
    window.requestAnimationFrame(Engine.Run);
  },



  Awake: function() {
    for (var i = this.gameObjects.length; i--;) {
      var awakening = this.gameObjects[i].components.awakening;
      this.gameObjects[i].components.awakening = [];
      this.gameObjects[i].components.starting =
        this.gameObjects[i].components.starting.concat(awakening);
      for (var j = awakening.length; j--;) {
        awakening[j].Awake();
      }
    }
  },



  Start: function() {
    for (var i = this.gameObjects.length; i--;) {
      var starting = this.gameObjects[i].components.starting;
      this.gameObjects[i].components.starting = [];

      for (var j = starting.length; j--;) {
        var component = starting[j];

        if (component.enabled) {
          component.Start();
          this.gameObjects[i].components.running.push(component);

        } else {
          // FIXME: Pushes disabled components every frame.
          this.gameObjects[i].components.starting.push(component);
        }
      }
    }
  },



  Simulate: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.SendMessage('FixedUpdate');
    });

    Physics.Simulate();

    // On Trigger Enter/Exit/Stay.
    // On Collision Enter/Exit/Stay.
  },



  Update: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.SendMessage('Update');
    });

    Input.Update();

    document.getElementsByTagName('title')[0].innerHTML =
      parseInt(Time.deltaTime * 1000) + 'ms | ' + parseInt(1 / Time.deltaTime) + ' fps';
  },



  Render: function() {
    Camera.main.Render();
  },



  OnGUI: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.SendMessage('OnGUI');
    });
  }
};



// TODO: Make static method of Component.
var Destroy = function(gameObject) {
  var index = Engine.gameObjects.indexOf(gameObject);
  if (index > -1) {
    for (var i in gameObject.components) {
      var components = gameObject.components[i];
      for (var j = components.length; j--;) {
        var component = components[j];
        if (component instanceof Collider) {
          var _index = Engine.colliders.indexOf(component);
          if (_index > -1) {
            Engine.colliders.splice(_index, 1);
          }
        }
      }
    }
    Engine.gameObjects.splice(index, 1);
  }
}
