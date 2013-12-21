"use strict";

var Player = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };
  


  this.Awake = function() {
    this.transform.position.x = 400;
    this.transform.position.y = 400;
    this.gameObject.Add(Rigidbody);
    this.gameObject.Add(BoxCollider);
    
    this.exhaust.particleSystem.lifetime = 0.2;
    this.exhaust.particleSystem.rate = 120;
    this.exhaust.particleSystem.style = '#5555ff';
    this.exhaust.particleSystem.startSize = 3;
  };
  


  this.Update = function() {
    this.exhaust.transform.position = this.transform.position.Add(Vector2.down.Mul(30));
    this.exhaust.particleSystem.startVelocity = new Vector2((0.5-Math.random())*200, 200+50*Math.random());
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
