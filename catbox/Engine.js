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
    for (var i = Engine.gameObjects.length; i--;) {
      var awakening = Engine.gameObjects[i].components.awakening;
      Engine.gameObjects[i].components.awakening = [];
      Engine.gameObjects[i].components.starting =
        Engine.gameObjects[i].components.starting.concat(awakening);
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



GameObject.Instantiate = function(prefab, position, rotation) {
  var original = prefab.gameObject;
  var gameObject = new GameObject(original.name + " (clone)");
  gameObject.layer = original.layer;
  gameObject.tag = original.tag;

  for (var i in original.components) {
    var components = original.components[i];
    for (var j in components) {
      var component = components[j];
      var _component = gameObject.AddComponent(component.constructor);

      for (var k in component) {
        if (component.hasOwnProperty(k)) {
          var property = component[k];

          if (property == original) { // Avoid circular instantiation.
            continue;
          }

          if (property == null || typeof property != 'object') {
            _component[k] = property;

          } else if (property instanceof Component) {
            // ????

          } else if (property instanceof GameObject) {
            _component[k] = Instantiate(property);

          } else if (property instanceof Vector2) {
            _component[k] = property.Copy();

          } else if (property instanceof Array) {
            _component[k] = [];
            for (var l = 0, length = property.length; l < length; ++l) {
                _component[k][l] = property[l]; // TODO: Clone property member.
            }

          } else if (property instanceof Object) {
            _component[k] = {};
            for (var l in property) {
              if (property.hasOwnProperty(l)) {
                _component[k][l] = property[l]; // TODO: Clone property member.
              }
            }

          } else {
            console.log("Uncopyable property " + k + ": " + property + ".");
          }
        }
      }
    }
  }

  gameObject.transform.position = position || Vector2.zero;
  gameObject.transform.rotation = rotation || 0;

  if (prefab instanceof Component) {
    return gameObject.GetComponent(prefab.constructor);
  } else {
    return gameObject;
  }
};



var Instantiate = GameObject.Instantiate;
