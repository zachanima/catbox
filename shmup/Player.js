"use strict";

var Player = Component.extend({
  


  Awake: function() {
    this.transform.position.x = 400;
    this.transform.position.y = 400;
    this.Add(Rigidbody);
    this.Add(BoxCollider);
  },
  


  Update: function() {
    if (Input.GetKey(KeyCode.LeftArrow)) {
      this.transform.position.x -= 5;
    }

    if (Input.GetKey(KeyCode.RightArrow)) {
      this.transform.position.x += 5;
    }

    if (Input.GetKey(KeyCode.Space)) {
      var bullet = new GameObject('Bullit');
      bullet.Add(Sprite).Load('res/shmupenemy.png');
      bullet.Add(BoxCollider).layers = [1];
      bullet.layer = 2;
      bullet.Add(Rigidbody).useGravity = false;
      bullet.rigidbody.velocity.y = -64;
      bullet.transform.position = this.transform.position.Mul(1);
    }
  },
  

});
