"use strict"; // var width = document.getElementsByClassName('game')[0].offsetWidth - 2; var height = (width * 9) / 16;

window.onload = function() {
  var player = new GameObject('player', Player);
  var ground = new GameObject('ground');
  Physics.gravity.y = 5;
  ground.Add(BoxCollider);
  ground.transform.position = new Vector2(300, 350);
  ground.collider.width = 600;
  ground.collider.height = 5;

  Engine.Start(600, 360);
};
