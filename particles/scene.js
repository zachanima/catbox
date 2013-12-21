"use strict";

window.onload = function() {
  Engine.Load([], function() {
    var emitter = new GameObject("Emitter", ParticleSystem);
    emitter.transform.position = new Vector2(canvas.width / 2, canvas.height / 2);
    emitter.transform.rotation = Math.PI / 3;
    emitter.particleSystem.gravityModifier = 0.25;
    emitter.particleSystem.startColor = Color.black;
    emitter.particleSystem.startSpeed = 20;
    emitter.particleSystem.startSize = 8;
    emitter.particleSystem.endColor = Color.black;
    emitter.particleSystem.endSize = 0;
    emitter.particleSystem.graphic = new Circle(1);
    emitter.particleSystem.graphic.stroke = true;
    emitter.particleSystem.graphic.strokeColor = Color.white;
    context.lineWidth = 0.125;
  }, 800, 480);
};
