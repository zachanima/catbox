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
    
    if (Input.GetKeyDown(KeyCode.Space) {
      var laser = new GameObject('Laser', Laser);
    }
  },
  

});
