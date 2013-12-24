"use strict";

var GameObject = Object.augment(function() {
  this.constructor = function(name, Class) {
    this.components = { awakening: [], starting: [], running: [] };
    this.layer = 0;
    this.name = name || '';
    this.tag = null; // TODO: Define get/set.
    this.transform = this.AddComponent(Transform);
    this.gameObject = this;

    // TODO: Add this to hierarchy.
    Engine.gameObjects.push(this);

    Class && this.AddComponent(Class);
  };



  this.AddComponent = function(Class) {
    var component = new Class();
    component.gameObject = this;

    if (component instanceof Collider) {
      this.collider = component;
      for (var i in this.components) {
        if (this.components.hasOwnProperty(i)) {
          this.components[i].forEach(function(_component) {
            _component.collider = component;
          });
        }
      }
      Engine.colliders.push(component);
      Physics.colliders.push(component);
    }

    if (component instanceof Camera) {
      this.camera = component;
      for (var i in this.components) {
        if (this.components.hasOwnProperty(i)) {
          this.components[i].forEach(function(_component) {
            _component.camera = component;
          });
        }
      }
    }

    if (component instanceof Renderer) {
      this.renderer = component;
      for (var i in this.components) {
        if (this.components.hasOwnProperty(i)) {
          this.components[i].forEach(function(_component) {
            _component.renderer = component;
          });
        }
      }
    }

    if (Class === Rigidbody) {
      this.rigidbody = component;
      for (var i in this.components) {
        if (this.components.hasOwnProperty(i)) {
          this.components[i].forEach(function(_component) {
            _component.rigidbody = component;
          });
        }
      }
      Physics.rigidbodies.push(component);
    }

    // TODO: Use .renderer instead.
    if (Class === Sprite) {
      this.sprite = component;
      for (var i in this.components) {
        if (this.components.hasOwnProperty(i)) {
          this.components[i].forEach(function(_component) {
            _component.sprite = component;
          });
        }
      }
    }

    if (Class === Renderer) {
      this.renderer = component;
      for (var i in this.components) {
        if (this.components.hasOwnProperty(i)) {
          this.components[i].forEach(function(_component) {
            _component.renderer = component;
          });
        }
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
    component.camera = this.camera;
    component.collider = this.collider;
    component.rigidbody = this.rigidbody;
    component.sprite = this.sprite;
    component.particleSystem = this.particleSystem;
    component.renderer = this.renderer;
    component.transform = this.transform || component;

    this.components.awakening.push(component);

    return component;
  };



  this.GetComponent = function(Class) {
    for (var i in this.components) {
      for (var j = this.components[i].length; j--;) {
        var component = this.components[i][j];
        if (component instanceof Class) {
          return component;
        }
      }
    }
  };



  this.SendMessage = function(methodName, value) {
    var running = this.components.running;
    for (var i = running.length; i--;) {
      var component = running[i];
      component.enabled && component[methodName] && component[methodName](value);
    }
  };



  this.Render = function() {
    context.save();
    context.translate(parseInt(this.transform.position.x), parseInt(this.transform.position.y));
    context.rotate(this.transform.rotation);
    context.scale(this.transform.scale.x, this.transform.scale.y);

    this.SendMessage('Render');

    context.restore();
  };
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



// SLOOOW.
GameObject.FindObjectsOfType = function(Class) {
  var result = [];

  for (var i in Engine.gameObjects) {
    var gameObject = Engine.gameObjects[i];
    for (var j in gameObject.components) {
      var components = gameObject.components[j];
      for (var k in components) {
        var component = components[k];

        if (component instanceof Class) {
          result.push(component);
        }
      }
    }
  }

  return result;
};
