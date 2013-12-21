"use strict";

var Player = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };
  


  this.Awake = function() {
    this.transform.position.x = 400;
    this.transform.position.y = 400;
    this.gameObject.AddComponent(Rigidbody);
    this.gameObject.AddComponent(BoxCollider);
    
    this.exhaust.transform.rotation = Math.PI;
    this.exhaust.particleSystem.startLifetime = 0.2;
    this.exhaust.particleSystem.emissionRate = 60;
    this.exhaust.particleSystem.endColor = new Color(0x55, 0x55, 0xff, 0);
    this.exhaust.particleSystem.startSize = 3;
  };
  


  this.Update = function() {
    this.exhaust.particleSystem.startColor = new Color(0x00, 0x00, 0xff, Math.random()*0xff);
    this.exhaust.transform.position = this.transform.position.Add(Vector2.down.Mul(32));
    this.exhaust.transform.rotation = Math.PI + 0.5 * (Math.random() - 0.5);
    this.exhaust.particleSystem.startSpeed = 200+50*Math.random();
    if (Input.GetKey(KeyCode.LeftArrow)) {
      this.transform.position.x -= 5;
    }

    if (Input.GetKey(KeyCode.RightArrow)) {
      this.transform.position.x += 5;
    }
    
    if (Input.GetKey(KeyCode.Space)) {
      var laser = new GameObject('Laser', Laser);
      laser.transform.position.x = this.transform.position.x;
      laser.transform.position.y = this.transform.position.y;
    }
  };
});
