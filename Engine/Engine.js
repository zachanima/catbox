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



  CollisionUpdate: function() {
    // FIXME: Only checks visible rigidbodies for collisions.
    var a = new Vector2(canvas.width / 4, canvas.height / 4);
    var b = new Vector2(canvas.width - canvas.width / 4, canvas.height - canvas.height / 4);
    var colliders = Physics.OverlapAreaAll(a, b);

    var length = colliders.length;
    for (var i = length; i--;) {
      var collider = colliders[i];

      if (!collider.rigidbody) {
        continue;
      }

      var a = new Vector2(
        collider.transform.position.x + collider.center.x - collider.size.x / 2,
        collider.transform.position.y + collider.center.y - collider.size.y / 2
      );
      var b = new Vector2(
        collider.transform.position.x + collider.center.x + collider.size.x / 2,
        collider.transform.position.y + collider.center.y + collider.size.y / 2
      );

      var _colliders = Physics.OverlapAreaAll(a, b);
    }
  },



  SimulatePhysics: function() {
    Engine.CollisionUpdate();

    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.SendMessage('SimulatePhysics');
    });
  },



  Update: function() {
    Engine.gameObjects.forEach(function(gameObject) {
      gameObject.SendMessage('Update');
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
      gameObject.SendMessage('OnGUI');
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
