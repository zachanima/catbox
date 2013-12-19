"use strict";

window.onload = function() {



  //Load up engine
  Engine.Load([
    'res/star.png',
    'res/ship.png',
    'res/shmupenemy.png'
  ], function() {
    var width = 800;
    var height = 480;
    Physics.gravity = Vector2.zero;

    for (var i = 10; 0 <= i; --i) {
      var star = new GameObject('Star', Star);
      star.Add(Sprite).Load('res/star.png');
    }

    //Create enemy
    var enemy = new GameObject('Enemy', Enemy);
    enemy.Add(Sprite).Load('res/shmupenemy.png');

    //Create player
    var player = new GameObject('Player', Player);
    player.Add(Sprite).Load('res/ship.png');

    //Create text
    var gametext = new GameObject('GameText', GameText);
    gametext.transform.position.x = 400;
    gametext.transform.position.y = -100;
  }, 800, 480);
};
