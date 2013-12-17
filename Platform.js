"use strict";

var Platform = Component.extend({
  Awake: function() {
    this.Add(BoxCollider);
    this.collider.width = 100;
    this.collider.height = 10;
    this.lifetime = 0;
  },



  Update: function() {
    this.transform.position.x = 400 + 400 * Math.cos(this.lifetime);
    this.transform.position.y = 520 + 50 * Math.sin(this.lifetime);
    this.lifetime += Time.deltaTime;
  },
});
