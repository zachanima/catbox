"use strict";

window.onload = function() {



  Engine.Load([
    'res/ship.png',
    'res/shmupenemy.png',
    'res/enemy2.png'
  ], function() {
    var width = 800;
    var height = 480;

    Physics.gravity = Vector2.zero;
    
    var star = new GameObject('Star', Star);
    star.Add(ParticleSystem);

    //Create enemy
    for (var i = 0; i < 1; ++i) {
      var enemy = new GameObject('Enemy', Enemy);
      enemy.Add(Sprite).Load('res/shmupenemy.png');
    };

    var enemy2 = new GameObject('Enemy2', Enemy2);
    enemy2.Add(Sprite).Load('res/enemy2.png');

    var exhaust = new GameObject('Exhaust', ParticleSystem);

    //Create player
    var player = new GameObject('Player', Player);
    player.Add(Sprite).Load('res/ship.png');
    player.GetComponent(Player).exhaust = exhaust;
    

    //Create text
    var gametext = new GameObject('GameText', GameText);
    gametext.transform.position.x = 400;
    gametext.transform.position.y = -100;
  }, 800, 480);
};
