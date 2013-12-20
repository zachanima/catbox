"use strict";

var GameObject = Class.extend({
  init: function(name, Class) {
    this.name = name || "";
    this.components = [];
    this.layer = 0;

    this.components = {
      awakening: [],
      starting: [],
      running: []
    };

    this.transform = this.Add(Transform);

    Engine.gameObjects.push(this);

    // Refresh hierarchy.
    document.getElementById('hierarchy').innerHTML = '';
    Engine.gameObjects.forEach(function(gameObject) {
      var li = document.createElement('li');
      li.innerHTML = gameObject.name;
      document.getElementById('hierarchy').appendChild(li);
    });

    if (Class) {
      this.Add(Class);
    }
  },



  // TODO: Rename to AddComponent.
  Add: function(Class) {
    var component = new Class();
    component.gameObject = this;

    if (component instanceof Collider) {
      this.collider = component;
      for (var i in this.components) {
        this.components[i].forEach(function(_component) {
          _component.collider = component;
        });
      }
      Engine.colliders.push(component);
    }

    if (Class === Rigidbody) {
      this.rigidbody = component;
      for (var i in this.components) {
        this.components[i].forEach(function(_component) {
          _component.rigidbody = component;
        });
      }
    }

    // TODO: Use .renderer instead.
    if (Class === Sprite) {
      this.sprite = component;
      for (var i in this.components) {
        this.components[i].forEach(function(_component) {
          _component.sprite = component;
        });
      }
    }

    if (Class === ParticleSystem) {
      this.particleSystem = component;
      for (var i in this.components) {
        this.components[i].forEach(function(_component) {
          _component.particleSystem = component;
        });
      }
    }

    // Maintain component crosslinks.
    component.name = this.name;
    component.collider = this.collider;
    component.rigidbody = this.rigidbody;
    component.sprite = this.sprite;
    component.particleSystem = this.particleSystem;
    component.transform = this.transform || component;

    this.components.awakening.push(component);

    return component;
  },



  GetComponent: function(Class) {
    for (var i in this.components) {
      for (var j = this.components[i].length; j--;) {
        var component = this.components[i][j];
        if (component instanceof Class) {
          return component;
        }
      }
    }
  },



  SimulatePhysics: function() {
    this.components.running.forEach(function(component) {
      component.SimulatePhysics();
    });
  },



  LateUpdate: function() {
    this.components.forEach(function(component) {
      component.LateUpdate();
    });
  },



  Render: function() {
    context.save();
    context.translate(parseInt(this.transform.position.x), parseInt(this.transform.position.y));
    context.rotate(this.transform.rotation);
    context.scale(this.transform.scale.x, this.transform.scale.y);

    this.components.running.forEach(function(component) {
      component.Render();
    });

    context.restore();
  },



  OnGUI: function() {
    this.components.running.forEach(function(component) {
      component.OnGUI();
    });
  },



  OnCollisionStay: function(collision) {
    for (var i in this.components) {
      for (var j = this.components[i].length; j--;) {
        this.components[i][j].OnCollisionStay();
      }
    }
  },



  OnCollisionEnter: function(collision) {
    for (var i in this.components) {
      for (var j = this.components[i].length; j--;) {
        this.components[i][j].OnCollisionEnter(collision);
      }
    }
  },



  OnCollisionExit: function(collision) {
    for (var i in this.components) {
      for (var j = this.components[i].length; j--;) {
        this.components[i][j].OnCollisionExit(collision);
      }
    }
  },



  Editor: function() {
    var inspector = document.getElementById('inspector');
    inspector.innerHTML = '';
    
    for (var i in this.components) {
      for (var j = this.components[i].length; j--;) {
        var component = this.components[i][j];
        var div = document.createElement('div');
        var klass = Class;
        for (var c in window) {
          if (
            c != 'localStorage' &&
            c != 'sessionStorage' &&
            window[c] !== null &&
            typeof(window[c]) == 'function' &&
            window[c].extend &&
            component instanceof window[c]) {
            klass = c;
          };
        }
        div.innerHTML = '<h2>' + klass + '</h2>';
        for (var p in component) {
          if (
            typeof(component[p]) !== 'undefined' &&
            typeof(component[p]) !== 'function' &&
            component[p] !== component &&
            !(component[p] instanceof Component) &&
            !(component[p] instanceof Array) &&
            component[p] !== component.gameObject) {
            div.innerHTML += '<p>' + p + ': ' + JSON.stringify(component[p]) + '</p>';
          }
        }
        inspector.appendChild(div);
      }
    }
  },
});



GameObject.FindObjectOfType = function(Class) {
  for (var i in Engine.gameObjects) {
    var gameObject = Engine.gameObjects[i];
    for (var j in gameObject.components) {
      var component = gameObject.components[j];
      if (component instanceof Class) {
        return component;
      }
    }
  }
};



GameObject.FindObjectsOfType = function(Class) {
  var result = [];

  for (var i in Engine.gameObjects) {
    var gameObject = Engine.gameObjects[i];
    for (var j in gameObject.components) {
      var component = gameObject.components[j];
      if (component instanceof Class) {
        result.push(component);
      }
    }
  }

  return result;
};
