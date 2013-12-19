"use strict";

window.onload = function() {
  Engine.Load(['res/box.png'], function() {
    new GameObject('Universe', Universe);
  }, 800, 480);
};
