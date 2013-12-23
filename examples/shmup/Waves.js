"use strict";



window.wave = null;

var Waves = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };

  this.Awake = function() {
    this.phase = 0;
    window.wave = this; 
    setTimeout(this.Wave1, 1000);

  };



  this.Wave1 = function() {
    var enemy = new GameObject('Enemy', Enemy);
    enemy.AddComponent(Sprite).Load('res/shmupenemy.png');
    console.log('enemy');
    ++wave.phase;
    if (wave.phase <= 9) {
      setTimeout(wave.Wave1, 1000);
    }
  };
});
