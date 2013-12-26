"use strict";

var Scorch = Function;

function scorch() {
  Engine.Load([], function() {
    var terrain = new GameObject('Terrain', Scorch.Terrain);
    terrain.transform.position = new Vector2(0, 480 / 2 - 32);
    terrain.AddComponent(Renderer);
    terrain.renderer.graphic = new Graphic(canvas.width, canvas.height);
    terrain.renderer.graphic.Render = function(context) {
      context.fillStyle = 'black';
      context.save();
      context.translate(0, 0);
      for (var x = 0; x < canvas.width; ++x) {
        context.fillRect(x, 0, 1, 15);
      }
      context.restore();
    };
    // terrain.renderer.Cache();
  });
}
