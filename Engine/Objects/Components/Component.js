"use strict";

var Component = Object.augment(function() {
  this.constructor = function() {
    this.enabled = true;
  };



  // Utility functions.
  this.GetComponent = function(Class) {
    return this.gameObject.GetGomponent(Class);
  };



  // Engine functions.
  this.SimulatePhysics = function() { };
  this.Render = function() { };

  // Virtual functions.
  this.Awake = function() { };
  this.Start = function() { };
  this.FixedUpdate = function() { };
  this.Update = function() { };
  this.LateUpdate = function() { };
  this.OnGUI = function() { };
  this.OnCollisionStay = function() { };
  this.OnCollisionEnter = function() { }; 
  this.OnCollisionExit = function() { };
});
