"use strict";

var Noise = {
   


  Random: function(n) {
    n = (n >> 13) ^ n;
    var nn = (n * (n * n * 60493 + 19990303) + 1376312589) & 0x7fffffff;
    return 1.0 - (nn / 1073741824.0);
  },



  Random2: function(x, y) {
    x = (x >> 13) ^ x;
    var nn = (x * (y * x * 60493 + 19990303) + 1376312589) & 0x7fffffff;
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


  
  Coherent2: function(x, y) {
    var intX = parseInt(x);
    var intY = parseInt(y);
    var n0 = Noise.Random2(intX, intY);
    var n1 = Noise.Random2(intX + 1, intY);
    var n2 = Noise.Random2(intX, intY + 1);
    var n3 = Noise.Random2(intX + 1, intY + 1);
    var weight = x - intX;
    var noise = Noise.Lerp(n0, n1, weight);
    weight = y - intY;
    noise += Noise.Lerp(n3,n4, weight);
    return noise / 2;
  },



  Sin: function(x, octaves) {
    var signal = 0;
    var amplitude = 1 + Noise.Coherent(x) * 0.25;
    var frequency = 1 / octaves + Noise.Coherent(9997 + x) * 0.25 / octaves;
    var factor = 0;

    for (var i = 0; i < octaves; ++i) {
      signal += amplitude * Math.sin(x * (frequency));
      factor += amplitude;
      amplitude *= 0.5 + Noise.Coherent(i) * 0.125;
      frequency *= 2 + Noise.Coherent(i) * 0.5;
    }
    return signal / factor;
  },



  Sin2: function(x, y, octaves) {
    var signal = 0;
    var amplitude = 1 + Noise.Coherent2(x, y) * 0.125;
    var frequency = 1 / octaves + Noise.Coherent2(x + 31337, y + 1663) * 0.25 / octaves;
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
