"use strict";

var Component = Class.extend({
  enabled: true,



  // Utility functions.
  GetComponent: function(Class) {
    return this.gameObject.GetGomponent(Class);
  },



  // Engine functions.
  SimulatePhysics: function() { },
  Render: function() { },

  // Virtual functions.
  Awake: function() { },
  Start: function() { },
  FixedUpdate: function() { },
  Update: function() { },
  LateUpdate: function() { },
  OnGUI: function() { },
  OnCollisionStay: function() { },
  OnCollisionEnter: function() { }, 
  OnCollisionExit: function() { },
});
