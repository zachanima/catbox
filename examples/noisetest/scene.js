"use strict";

window.onload = function() {
  Engine.Load([], function() {
    var graph = new GameObject("Graph", Graph);
  }, 256, 256);
};
