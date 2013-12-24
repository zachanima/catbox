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

  // Player.
  var player = new GameObject('Player', Player).GetComponent(Player);
  player.gameObject.AddComponent(Sprite).Load('res/ship.png');
  player.gameObject.AddComponent(Rigidbody);
  player.gameObject.AddComponent(BoxCollider);
  player.transform.position.y = 120;

  // Exhaust.
  player.exhaust = new GameObject('Exhaust', ParticleSystem).GetComponent(ParticleSystem);
  player.exhaust.startLifetime = 0.2;
  player.exhaust.emissionRate = 60;
  player.exhaust.startSize = 3;

  // Laser.
  player.laser = new GameObject('Laser', Laser).GetComponent(Laser);
  player.laser.gameObject.AddComponent(Rigidbody);
  player.laser.gameObject.AddComponent(BoxCollider);
  player.laser.gameObject.AddComponent(ParticleSystem);
  player.laser.gameObject.layer = 2;
  player.laser.collider.width = 10;
  player.laser.collider.height = 10;
  player.laser.collider.isTrigger = true;
  player.laser.particleSystem.startLifetime = 0.2;
  player.laser.particleSystem.startColor = Color.green;
  player.laser.particleSystem.endColor = new Color(0x00, 0xff, 0x00, 0);
  player.laser.particleSystem.emissionRate = 100;
  player.laser.particleSystem.startSize = 2;
  player.laser.particleSystem.endSize = 1;

  // Missile.
  player.missile = new GameObject('Missile', Missile).GetComponent(Missile);
  player.missile.gameObject.AddComponent(Sprite).Load('res/missile.png');
  player.missile.gameObject.AddComponent(Rigidbody);
  player.missile.gameObject.AddComponent(BoxCollider);
  player.missile.rigidbody.velocity.y = -80;
  player.missile.gameObject.layer = 3;
  player.missile.exhaust = new GameObject('Exhaust', ParticleSystem).GetComponent(ParticleSystem);
  player.missile.exhaust.emissionRate = 60;
  player.missile.exhaust.startSpeed = 0;
  player.missile.exhaust.maxParticles = 18;
  player.missile.exhaust.startLifetime = 0.3;
  player.missile.exhaust.startSize = 3;
  player.missile.exhaust.startColor = new Color(0xff, 0xdd, 0x88);
  player.missile.exhaust.endColor = new Color(0xff, 0x00, 0x00);

  // Enemy2.
  var enemy2 = new GameObject('Enemy2', Enemy2).GetComponent(Enemy2);
  enemy2.gameObject.AddComponent(Sprite).Load('res/enemy2.png');
  enemy2.transform.rotation = Math.PI / 2;
  enemy2.explosion = new GameObject('Explosion', ParticleSystem).GetComponent(ParticleSystem);
  enemy2.explosion.graphic = new Circle(3);
  enemy2.explosion.emissionRate = 60;
  enemy2.explosion.maxParticles = 10;
  enemy2.explosion.startSpeed = 190;
  enemy2.explosion.startColor = new Color(0xff, 0xcc, 0x66);
  enemy2.explosion.endColor = new Color(0xff, 0x00, 0x00);
  enemy2.explosion.endSize = 0.1;
  enemy2.explosion.startLifetime = 1;

  // Waves.
  var waves = new GameObject('Waves', Waves).GetComponent(Waves);
  waves.enemy = new GameObject('Enemy', Enemy);
  waves.enemy.AddComponent(Sprite).Load('res/shmupenemy.png');
  waves.enemy.AddComponent(Rigidbody);
  waves.enemy.AddComponent(BoxCollider);
  waves.enemy.layer = 3;
  waves.enemy.collider.isTrigger = true;
  
  // Star.
  var star = new GameObject('Star', Star).AddComponent(ParticleSystem);
  star.transform.rotation = Math.PI;
  star.startLifetime = 24;
  star.emissionRate = 40;
  star.maxParticles = 1400;
  star.startColor = Color.white;
  star.endColor = Color.white;

  new GameObject('Main Camera', Camera).tag = 'MainCamera';
  new GameObject('GameText', GameText).transform.position = new Vector2(400, -100);
  new GameObject('UI', UI);

  Camera.main.backgroundColor = Color.black;

}, width, height);
