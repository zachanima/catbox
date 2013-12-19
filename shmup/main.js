"use strict";

window.onload = function() {
  Engine.Load([
    'res/star.png',
    'res/ship.png'
  ], function() {
    var width = 800;
    var height = 480;
    Physics.gravity = Vector2.zero;

    for (var i = 1000; 0 <= i; --i) {
      var star = new GameObject('Star', Star);
      star.Add(Sprite).Load('res/star.png');
    }

    var player = new GameObject('Player', Player);
    player.Add(Sprite).Load('res/ship.png');
  }, 800, 480);
};
