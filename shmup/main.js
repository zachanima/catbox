"use strict";

window.onload = function() {
  var width = 800;
  var height = 480;
  Physics.gravity = Vector2.zero;

  for (var i = 100; 0 <= i; --i) {
  var star = new GameObject('Star', Star);
  star.Add(Sprite).Load('res/star.png');
  }
  var player = new GameObject('Player', Player);
  player.Add(Sprite).Load('res/ship.png');
  //  context.fillStyle = '#8080ff';
  //  context.fillRect(0, 0, canvas.width, canvas.height);
  Engine.Start(width, height);
};
