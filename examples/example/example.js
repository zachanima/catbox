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
    var glitter = new GameObject('Glitter', ParticleSystem).particleSystem;
    glitter.startColor = Color.white;
    glitter.gravityModifier = 0;
    glitter.startSize = 2;
    glitter.emissionRate = 200;
    glitter.emissionBursts = { 0.0: 1000, 2.5: 1000 };
    glitter.maxParticles = 3000;
    glitter.angle = 2 * Math.PI;
    glitter.startSpeed = 25;
  });
}
