"use strict";

var Universe = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this) };



  this.Awake = function() {
    this.bodies = [];

    for (var i = 256; i--;) {
      var body = new GameObject('Body', Body);
      body.Add(Sprite);
      body.sprite.Load('res/box.png');
      body.Add(Rigidbody).useGravity = false;
      body.Add(BoxCollider);
      body.transform.position = new Vector2(Math.random() * canvas.width, Math.random() * canvas.height);
      body.rigidbody.velocity = new Vector2(canvas.width / 2- Math.random() * canvas.width, canvas.height / 2 - Math.random() * canvas.height).Mul(0.1);
      this.bodies.push(body.GetComponent(Body));
    }
  };



  this.Update = function() {
    for (var i = this.bodies.length; i--;) {
      for (var j = this.bodies.length; j--;) {
        if (i != j) {
          this.bodies[i].Attract(this.bodies[j]);
        }
      }
    }
  };
});
