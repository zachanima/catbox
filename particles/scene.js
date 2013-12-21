"use strict";

window.onload = function() {
  Engine.Load([], function() {
    var emitter = new GameObject("Emitter", ParticleSystem);
    emitter.transform.position = new Vector2(canvas.width / 2, canvas.height / 2);
    emitter.transform.rotation = Math.PI / 3;
    emitter.particleSystem.gravityModifier = 0.25;
    emitter.particleSystem.endColor = Color.red;
    emitter.particleSystem.startSpeed = 20;
    emitter.particleSystem.startSize = 8;
  }, 800, 480);
};
