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
  var image = new Image();
  image.src = 'res/box.png';

  for (var i = 0; i < 512; ++i) {
    var box = new GameObject('box', Rigidbody);
    box.transform.position = new Vector2(Math.random() * width, Math.random() * height);
    box.Add(Sprite);
    box.sprite.image = image;
    box.Add(BoxCollider);
  }

  Engine.Start(width, height);
};
