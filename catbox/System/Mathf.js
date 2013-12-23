"use strict";


var Mathf = {
  state: 7, 


  
  Random: function() {
    var n = Mathf.state;
    n = (n >> 13) ^ n;
    Mathf.state = (n * (n * n * 60493 + 19990303) + 1376312589) & 0x7fffffff;
    return 1.0 - (Mathf.state / 1073741824.0);
  },



  Lerp: function(a, b, w) {
    return a * (1 - w) + b * w;
  },
};
