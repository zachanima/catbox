"use strict";

window.onload = function() {
  var width = 800;
  var height = 480;

  Engine.Load(['res/box.png'], function() {
    var ground = new GameObject("Ground", BoxCollider);
    ground.transform.position = new Vector2(canvas.width / 2, canvas.height - 32);
    ground.collider.width = canvas.width;
    ground.collider.height = 64;

    Physics.gravity = Vector2.down;

    for (var y = 24; y--;) {
      for (var x = (canvas.width - 32) / 16; x--;) {
        var box = new GameObject('Box', Rigidbody);
        box.transform.position.x = x * 32 + 32 - Math.pow(x, 1.375);
        box.transform.position.y = y * 32 - canvas.height + Math.pow(x, 1.375);
        box.AddComponent(Sprite).Load('res/box.png');
        box.AddComponent(BoxCollider);
      }
    }

    context.strokeStyle = '#fff'; // Debug.
  }, width, height);
};
