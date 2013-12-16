"use strict";

var GameObject = Class.extend({
  init: function(name, Class) {
    this.name = name || "";
    this.components = [];

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
      return this.Add(Class);
    }
  },



  Add: function(Class) {
    var component = new Class();
    component.gameObject = this;

    if (component instanceof Collider) {
      this.collider = component;
      this.components.forEach(function(_component) {
        _component.collider = component;
      });
    }

    if (Class === Rigidbody) {
      this.rigidbody = component;
      this.components.forEach(function(_component) {
        _component.rigidbody = component;
      });
    }

    if (Class === Sprite) {
      this.sprite = component;
      this.components.forEach(function(_component) {
        _component.sprite = component;
      });
    }

    // Maintain component crosslinks.
    component.name = this.name;
    component.collider = this.collider;
    component.rigidbody = this.rigidbody;
    component.sprite = this.sprite;
    component.transform = this.transform || component;

    this.components.push(component);

    component.Awake();

    return component;
  },



  Get: function(Class) {
    var result = undefined;

    this.components.forEach(function(component) {
      if (component instanceof Class) {
        result = component;
      }
    });

    return result;
  },



  PhysicsUpdate: function() {
    this.components.forEach(function(component) {
      component.PhysicsUpdate();
    });
  },



  Update: function() {
    this.components.forEach(function(component) {
      component.Update();
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
    this.components.forEach(function(component) {
      component.Render();
    });
    context.restore();
  },



  OnCollisionStay: function(collider) {
    this.components.forEach(function(component) {
      component.OnCollisionStay(collider);
    });
  },
});
