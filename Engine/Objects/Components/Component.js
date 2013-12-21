"use strict";

var Component = Object.augment(function() {
  this.constructor = function() { this.enabled = true; };

  this.GetComponent = function(Class) {
    return this.gameObject.GetGomponent(Class);
  };

  this.Awake = function() { };
  this.Start = function() { };
});
