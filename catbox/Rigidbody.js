"use strict";

var Rigidbody = Component.extend({
  init: function() {
    this.velocity = new Vector2(0, 0);
    this.mass = 1;
    this.useGravity = true;
    this.drag = 0;
  },



  PhysicsUpdate: function() {
    this.transform.position =
      this.transform.position.Add(this.velocity.Mul(Time.deltaTime));
  },



  Update: function() {
    this.velocity = this.velocity.Mul(1 - this.drag * Time.deltaTime);
    if (this.useGravity) {
      this.AddForce(Physics.gravity.Mul(this.mass*Time.deltaTime*100));
    }
  },



  AddForce: function(force) {
    this.velocity = this.velocity.Add(force.Mul(1 / this.mass));
  },
});
