"use strict";

var Component = Object.augment(function() {
  this.constructor = function() {
    this.enabled = true;
    Object.defineProperty(this, 'name', {
      get: function() { return this.gameObject.name; },
      set: function(name) { this.gameObject.name = name; }
    });
    Object.defineProperty(this, 'tag', {
      get: function() { return this.gameObject.tag; },
      set: function(tag) { this.gameObject.tag = tag; }
    });
  };



  this.GetComponent = function(Class) {
    return this.gameObject.GetGomponent(Class);
  };



  this.Awake = function() { };
  this.Start = function() { };
});
