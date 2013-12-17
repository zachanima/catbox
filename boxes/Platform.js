"use strict";

var Platform = Component.extend({
  Awake: function() {
    this.Add(BoxCollider);
    this.collider.width = 100;
    this.collider.height = 10;
    this.lifetime = 0;
  },



  Update: function() {
    this.transform.position.x = 400;
    this.transform.position.y = 480 + 120 * Math.sin(this.lifetime);
    this.lifetime += Time.deltaTime;
  },
});
