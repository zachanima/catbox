"use strict";

var Resources = {
  callback: function() { },
  loaded: [],
  loading: [],



  Preload: function() {
    var length = Resources.loading.length;

    if (length > 0) {
      var src = Resources.loading.pop();
      var image = new Image();
      image.onload = Resources.Preload;
      image.src = src;
      Resources.loaded[src] = image;

    } else {
      Resources.callback();
      Engine.Begin();
    }
  },



  Load: function(src) {
    return Resources.loaded[src];
  },
};
