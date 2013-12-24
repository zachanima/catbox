"use strict";

var Player = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };
  


  this.Awake = function() {
    this.leftLauncher = false;
    this.cooldown = false;
  };
  


  this.Update = function() {
    this.exhaust.startColor = new Color(0xdd, 0xdd, 0xff, Math.random() + 0.5);
    this.exhaust.startSpeed = 200+50*Math.random();
    this.exhaust.transform.position = this.transform.position.Add(Vector2.down.Mul(32));
    this.exhaust.transform.rotation = Math.PI + 0.5 * (Math.random() - 0.5);

    if (Input.GetKey(KeyCode.LeftArrow)) {
      this.transform.position.x -= 5;
    }

    if (Input.GetKey(KeyCode.RightArrow)) {
      this.transform.position.x += 5;
    }
    
    if (Input.GetKeyDown(KeyCode.Z)) {
      Instantiate(this.laser, this.transform.position.Add(Vector2.up.Mul(10)));
    }

    if (Input.GetKeyDown(KeyCode.X)) {
      var missile = new GameObject('Missile', Missile);
      missile.AddComponent(Sprite).Load('res/missile.png');
      missile.AddComponent(Rigidbody);
      missile.rigidbody.velocity.y = -80;
      missile.transform.position = this.transform.position.Copy();
      missile.transform.position.y += 30;

      if (this.leftLauncher) {
        missile.transform.position.x += 30;
        missile.GetComponent(Missile).startPoint = -Math.PI/2;
      } else {
        missile.transform.position.x -= 30;
        missile.GetComponent(Missile).startPoint = Math.PI/2;
      }

      this.leftLauncher = !this.leftLauncher;
    }

    /*
    if (Input.GetKeyDown(KeyCode.X) && !this.leftlauncher) {
      var missile = new GameObject('Missile', Missile);
      missile.GetComponent(Missile).startPoint = -Math.PI/2;
      missile.AddComponent(Rigidbody);
      missile.rigidbody.velocity.y = -80;
      missile.transform.position = this.transform.position.Copy();
      missile.transform.position.y += 30;
      missile.transform.position.x += 30;
      missile.AddComponent(Sprite).Load('res/missile.png');
      this.leftLauncher = true;
    } else if (Input.GetKeyDown(KeyCode.X) && this.leftLauncher) {
      var missile = new GameObject('Missile', Missile);
      missile.GetComponent(Missile).startPoint = Math.PI/2;
      missile.AddComponent(Rigidbody);
      missile.rigidbody.velocity.y = -80;
      missile.transform.position = this.transform.position.Copy();
      missile.transform.position.y += 30;
      missile.transform.position.x -= 30;
      missile.AddComponent(Sprite).Load('res/missile.png');
      this.leftLauncher = false;
    }
    */
  };
});
