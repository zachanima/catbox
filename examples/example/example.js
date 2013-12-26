"use strict";

var Example = Function;

function example() {
  Engine.Load(function() {
    // Circle.
    new GameObject('Circle', Renderer).renderer.graphic = new Circle(40);

    // Rectangle.
    var rectangle = new GameObject('Rectangle', Renderer);
    rectangle.renderer.graphic = new Rectangle(64, 64);

    // Particle System.
    var glitter = new GameObject('Glitter', ParticleSystem);
    glitter.particleSystem.startColor = Color.white;
    glitter.particleSystem.gravityModifier = 0;
  });
}
