"use strict";

var Scorch = Function;

function scorch() {
  var width = 800;
  var height = 480;
  Engine.Load([], function() {
    var terrain = new GameObject('Terrain', Scorch.Terrain);
    terrain.transform.position = new Vector2(0, 480 / 2 - 32);
    terrain.AddComponent(Renderer);
    terrain.renderer.graphic = new Graphic(800, 64);
    terrain.renderer.graphic.Render = function(context) {
      context.fillStyle = 'black';
      context.save();
      context.translate(-400, -32);
      for (var x = 0; x < 800; ++x) {
        context.fillRect(x, 64, 1, parseInt(-64*(1+Math.sin(x*0.02))/2));
      }
      context.restore();
    };
    terrain.renderer.Cache();

    // Camera.
    new GameObject('Main Camera', Camera).tag = 'MainCamera';
  }, width, height);
}
