"use strict";

window.onload = function() {
  var width = 800;
  var height = 480;

  Engine.Load([
    'res/mario.png',
    'res/terrain.png',
    'res/32circle.png',
  ], function() {
    var camera = new GameObject('Camera', Camera);
    var player = new GameObject('Player', Player);
    player.Add(Sprite).Load('res/mario.png');
    player.Add(BoxCollider);
    player.Add(Rigidbody);
    player.transform.position = new Vector2(width / 2, height / 2);

    var terrain = new GameObject('Terrain');
    // terrain.Add(Sprite).Load('res/terrain.png');
    terrain.Add(PixelCollider).Load('res/terrain.png');
    terrain.transform.position = new Vector2(width / 2, height - height / 2);
  }, width, height);
};
