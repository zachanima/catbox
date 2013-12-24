"use strict";

var width = 800;
var height = 480;

Engine.Load([
  'res/ship.png',
  'res/shmupenemy.png',
  'res/enemy2.png',
  'res/missile.png'
], function() {
  Physics.gravity = Vector2.zero;

  var player = new GameObject('Player', Player);
  player.AddComponent(Sprite).Load('res/ship.png');
  player.GetComponent(Player).exhaust = new GameObject('Exhaust', ParticleSystem);
  
  new GameObject('Main Camera', Camera).tag = 'MainCamera';
  new GameObject('Star', Star).AddComponent(ParticleSystem);
  new GameObject('Waves', Waves);
  new GameObject('Enemy2', Enemy2).AddComponent(Sprite).Load('res/enemy2.png');
  new GameObject('GameText', GameText).transform.position = new Vector2(400, -100);
  new GameObject('UI', UI);

  Camera.main.backgroundColor = Color.black;

}, width, height);
