"use strict";


var Grenade = Component.extend({
  Awake: function() {
    this.Add(Sprite).Load('res/32circle.png');
    this.Add(BoxCollider);
    this.Add(Rigidbody);
    this.collider.width = 8;
    this.collider.height = 8;
    this.transform.scale = Vector2.one.Mul(0.25);
  },
});
