"use strict";


var Grenade = Component.extend({
  Awake: function() {
    this.Add(Sprite).Load('res/32circle.png');
    this.Add(BoxCollider);
    this.Add(Rigidbody);
    this.collider.width = 4;
    this.collider.height = 4;
    this.transform.scale = Vector2.one.Mul(0.1);
  },
});
