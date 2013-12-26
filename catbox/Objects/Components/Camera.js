"use strict";

var Camera = Component.augment(function(base) {
  this.constructor = function() {
    base.constructor.call(this);
    this.backgroundColor = Color.white;
  };



  this.Render = function() {
    var width = context.canvas.width;
    var height = context.canvas.height;
    var fillStyle = context.fillStyle;

    context.fillStyle = this.backgroundColor.toString();
    context.clearRect(0, 0, width, height);
    context.fillRect(0, 0, width, height);

    context.fillStyle = fillStyle;

    context.save();
    context.translate(
      parseInt(-this.transform.position.x + width / 2),
      parseInt(-this.transform.position.y + height / 2)
    );
    context.rotate(this.transform.rotation);
    // context.scale using orthographicSize.
    
    for (var i = 0, length = Engine.gameObjects.length; i < length; ++i) {
      var gameObject = Engine.gameObjects[i];

      context.save();
      context.translate(
        parseInt(gameObject.transform.position.x),
        parseInt(gameObject.transform.position.y)
      );
      context.rotate(gameObject.transform.rotation);
      context.scale(gameObject.transform.scale.y, gameObject.transform.scale.y);

      gameObject.renderer && gameObject.renderer.Render();
      gameObject.particleSystem && gameObject.particleSystem.Render();

      context.restore();
    }

    context.restore();
  };
});



Object.defineProperty(Camera, 'main', {
  get: function() { 
    var cameras = GameObject.FindObjectsOfType(Camera);

    for (var i = cameras.length; i--;) {
      var camera = cameras[i];
      if (camera.enabled && camera.tag == 'MainCamera') {
        return camera;
      }
    }
  }
});
