"use strict"; // var width = document.getElementsByClassName('game')[0].offsetWidth - 2; var height = (width * 9) / 16;

window.onload = function() {
  var width = document.getElementsByClassName('game')[0].offsetWidth - 2;
  var height = (width * 9) / 16;

  var player = new GameObject('player', Player);
  var ground = new GameObject('ground');
  Physics.gravity.y = 5;
  ground.Add(BoxCollider);
  ground.transform.position = new Vector2(width / 2, 1.5 * height);
  ground.collider.width = width;
  ground.collider.height = height;

  // TODO: Work when using CTRL+R.
  for (var i = 0; i < 32; ++i) {
    var box = new GameObject('box', Rigidbody);
    box.transform.position = new Vector2(Math.random() * width, Math.random() * height);
    box.Add(Sprite).Load('res/box.png');
    box.Add(BoxCollider);
  }

  Engine.Start(width, height);
};
