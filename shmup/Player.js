"use strict";

var Player = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };
  


  this.Awake = function() {
    this.transform.position.x = 400;
    this.transform.position.y = 400;
    this.gameObject.Add(Rigidbody);
    this.gameObject.Add(BoxCollider);
  };
  


  this.Update = function() {
    if (Input.GetKey(KeyCode.LeftArrow)) {
      this.transform.position.x -= 5;
    }

    if (Input.GetKey(KeyCode.RightArrow)) {
      this.transform.position.x += 5;
    }
    
    if (Input.GetKeyDown(KeyCode.Space)) {
      var laser = new GameObject('Laser', Laser);
      laser.transform.position.x = this.transform.position.x;
      laser.transform.position.y = this.transform.position.y;
    }
  };
});
