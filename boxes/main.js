"use strict"; // var width = document.getElementsByClassName('game')[0].offsetWidth - 2; var height = (width * 9) / 16;

window.onload = function() {
  var width = document.getElementsByClassName('game')[0].offsetWidth - 2;
  var height = (width * 9) / 16;

  var terrain = new GameObject("terrain", PixelCollider);
  terrain.Add(Sprite).Load("res/terrain.png");
  terrain.transform.position = new Vector2(width / 2, height - 100);
  var pc = terrain.Get(PixelCollider);
  pc.Load("res/terrain.png");

  (new GameObject('camera', Camera)).transform.position = new Vector2(width / 2, height / 2);
  var player = new GameObject('player', Player);
  var ground = new GameObject('ground');
  Physics.gravity.y = 5;
  ground.Add(BoxCollider);
  ground.transform.position = new Vector2(width / 2, 1.5 * height);
  ground.collider.width = 10 * width;
  ground.collider.height = height;

  // TODO: Work when using CTRL+R.
  for (var i = 0; i < 32; ++i) {
    var box = new GameObject('box', Rigidbody);
    box.transform.position = new Vector2(Math.random() * width, Math.random() * height);
    box.Add(Sprite).Load('res/box.png');
    box.transform.rotation = 0.5 * Math.PI * parseInt(Math.random() * 4);
    box.Add(BoxCollider);
  }

  new GameObject("platform", Platform);
  var plat = new GameObject("platform2", Platform);
  plat.collider.width = 10;
  plat.collider.height = 100;

  Engine.Start(width, height);
};
