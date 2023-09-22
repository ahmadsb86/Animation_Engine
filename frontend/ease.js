let ease$ = (frame, animationData, type )=>{
    let map = function(n, start1, stop1, start2, stop2, withinBounds) {
        const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
          return newval;
        }
        if (start2 < stop2) {
          return constrain(newval, start2, stop2);
        } else {
          return constrain(newval, stop2, start2);
        }
      };

    let constrain = function(n, low, high) {
        return Math.max(Math.min(n, high), low);
      };

    return map(frame, animationData[2], animationData[3], animationData[0], animationData[1], true)
}
