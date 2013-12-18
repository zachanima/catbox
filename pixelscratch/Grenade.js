"use strict";


var Grenade = Component.extend({
  Awake: function() {
    this.explosion = new Circle(32);
    this.Add(Sprite).Load('res/32circle.png');
    this.Add(BoxCollider);
    this.Add(Rigidbody);
    this.collider.width = 4;
    this.collider.height = 4;
    this.transform.scale = Vector2.one.Mul(0.1);
  },



  OnCollisionEnter: function() {
    var _this = this;
    setTimeout(function() {
      var pc = GameObject.FindObjectsOfType(PixelCollider)[0];
      pc.SubtractMask(
        _this.explosion,
        _this.transform.position.x - pc.transform.position.x + pc.canvas.width / 2,
        _this.transform.position.y - pc.transform.position.y + pc.canvas.height / 2 + 12
      );
      Destroy(_this.gameObject);
    }, 2000);
  },



  Update: function() {
    if (this.transform.position.y > canvas.height) {
      Destroy(this.gameObject);
    }
  }
});
