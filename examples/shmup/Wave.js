"use strict";


var Waves = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };

  this.Awake = function() {
    console.log('enemy');
    this.Wave1();
  };

  this.Wave1 = function() {
    for (var i = 0; i < 10; ++i) {
      var enemy = new GameObject('Enemy', Enemy);
      enemy.AddComponent(Sprite).Load('res/shmupenemy.png');
      console.log('enemy');
    }
  };
});
