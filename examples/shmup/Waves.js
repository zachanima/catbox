"use strict";

window.wave = null;

var Waves = Component.augment(function(base) {
  this.constructor = function() { base.constructor.call(this); };

  this.Awake = function() {
    window.wave = this; 
    this.phase = 0;
    setTimeout(this.Wave1, 1000);
  };



  this.Wave1 = function() {
    Instantiate(wave.enemy, Vector2.up.Mul(250));

    if (++wave.phase < 10) {
      setTimeout(wave.Wave1, 1000);
    }
  };
});
