"use strict";

var Noise = {
   


  Random: function(n) {
    n = (n >> 13) ^ n;
    var nn = (n * (n * n * 60493 + 19990303) + 1376312589) & 0x7fffffff;
    return 1.0 - (nn / 1073741824.0);
  },

  

  Lerp: function(a, b, w) {
    return a * (1 - w) + b * w;
  },



  Coherent: function(x) {
    var intX = parseInt(x);
    var n0 = Noise.Random(intX);
    var n1 = Noise.Random(intX + 1);
    var weight = x - intX;
    var noise = Noise.Lerp(n0, n1, weight);
    return noise;
  },


  
  Sin: function(x, octaves) {
    var signal = 0;
    var amplitude = 1;
    var frequency = 1 / octaves;
    var factor = 0;

    for (var i = 0; i < octaves; ++i) {
      signal += amplitude * Math.sin(x * (frequency));
      factor += amplitude;
      amplitude *= 0.5 + Noise.Coherent(i) * 0.125;
      frequency *= 2 + Noise.Coherent(i) * 0.5;
    }
    return signal / factor;
  },
};
