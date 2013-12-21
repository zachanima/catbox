"use strict";

window.onload = function() {
  Engine.Load([], function() {
    var graph = new GameObject("Graph", Graph);
  }, 800, 480);
};
