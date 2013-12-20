"use strict";

var Component = Class.extend({
  enabled: true,



  GetComponent: function(Class) {
    return this.gameObject.GetGomponent(Class);
  },

 

  Awake: function() { 
    // Dummy.
  },



  Start: function() { /* Dummy. */ },



  FixedUpdate: function() {
    // Dummy.
  },



  SimulatePhysics: function() {
    // Dummy.
  },



  Update: function() {
    // Dummy.
  },



  LateUpdate: function() {
    // Dummy.
  },



  Render: function() {
    // Dummy.
  },

  

  OnGUI: function() {
    // Dummy.
  },


  OnCollisionStay: function() {
    // Dummy.
  },



  OnCollisionEnter: function() {
    // Dummy.
  },



  OnCollisionExit: function() {
    // Dummy.
  },
});
