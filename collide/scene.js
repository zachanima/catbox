"use strict";

window.onload = function() {
  var width = 800;
  var height = 480;



  Engine.Load([], function() {
    for (var i = 384; i--;) {
      var ball = new GameObject("Ball", Ball);
      ball.transform.position.x = Math.random() * width;
      ball.transform.position.y = Math.random() * height;
      ball.Add(Renderer);
      ball.renderer.graphic = new Circle(4 + Math.random() * Math.random() * 12);
      ball.renderer.graphic.fillColor = new Color(0xff, 0xff, 0xff, 0.125);
      ball.renderer.graphic.strokeColor = Color.Lerp(Color.blue, Color.white, 0.125);
      ball.renderer.graphic.stroke = false;
      ball.renderer.graphic.Cache();
      ball.Add(Rigidbody);
      ball.rigidbody.useGravity = false;
      ball.rigidbody.mass = Math.pow(ball.renderer.graphic.radius, 3) * 4 * Math.PI / 3;
      ball.rigidbody.velocity = new Vector2(Math.random() * 400 - 200, Math.random() * 400 - 200);
      ball.Add(CircleCollider);
      ball.collider.material.bounciness = 1;
    }

    context.strokeStyle = '#80ff80';
  }, width, height);
};
