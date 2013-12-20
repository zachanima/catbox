"use strict";

var Universe = Component.extend({
  bodies: [],



  Awake: function() {
    for (var i = 384; i--;) {
      var body = new GameObject('Body', Body);
      body.Add(Sprite).Load('res/box.png');
      body.Add(Rigidbody).useGravity = false;
      body.Add(BoxCollider);
      body.transform.position = new Vector2(Math.random() * canvas.width, Math.random() * canvas.height);
      body.rigidbody.velocity = new Vector2(canvas.width / 2- Math.random() * canvas.width, canvas.height / 2 - Math.random() * canvas.height).Mul(0.1);
      this.bodies.push(body.GetComponent(Body));
    }
  },



  Update: function() {
    for (var i = this.bodies.length; i--;) {
      for (var j = this.bodies.length; j--;) {
        if (i != j) {
          this.bodies[i].Attract(this.bodies[j]);
        }
      }
    }
  },
});
