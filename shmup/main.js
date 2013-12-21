"use strict";

window.onload = function() {
  var width = 800;
  var height = 480;

  Engine.Load([
    'res/ship.png',
    'res/shmupenemy.png',
    'res/enemy2.png'
  ], function() {
    Physics.gravity = Vector2.zero;
    
    var star = new GameObject('Star', Star);
    star.AddComponent(ParticleSystem);

    //Create enemy
    for (var i = 0; i < 1; ++i) {
      var enemy = new GameObject('Enemy', Enemy);
      enemy.AddComponent(Sprite).Load('res/shmupenemy.png');
    };

    var enemy2 = new GameObject('Enemy2', Enemy2);
    enemy2.AddComponent(Sprite).Load('res/enemy2.png');

    var exhaust = new GameObject('Exhaust', ParticleSystem);

    //Create player
    var player = new GameObject('Player', Player);
    player.AddComponent(Sprite).Load('res/ship.png');
    player.GetComponent(Player).exhaust = exhaust;
    
    //Create text
    var gametext = new GameObject('GameText', GameText);
    gametext.transform.position.x = 400;
    gametext.transform.position.y = -100;

  }, width, height);
};
