"use strict";

var Noise =  {

  B: 0x100,
  BM: 0xff,

  N: 0x1000,
  NM:0xfff,
  start:  1,


  
  init: function() {
    p = [Noise.B + Noise.B + 2];
    g3 = [Noise.B + Noise.B + 2][3];
    g2 = [Noise.B + Noise.B + 2][2];
    g1 = [Noise.B + Noise.B + 2];
  },

  setup: function(i,b0,b1,r0,r1) {
    t = vec[i] + N;
    b0 = ((int)t) & BM;
    b1 = (b0+1) & BM;
    r0 = t - (int)t;
    r1 = r0 - 1.;
  },
    

};
