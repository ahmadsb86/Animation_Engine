class shape {
  constructor(inputData) {
    this.index = shapeIndexCounter$;
    shapeIndexCounter$++;
    this.props = {
      //Set some default values. Use of inputData and modifications to default are made by derived classes
      x: 0,
      y: 0,
      rot: 0,
      fill: 220,
      stroke: 255,
      strokeWidth: 0,
      opacity: 0,
      scale: 2,
    };
  }
  addAnim(prop, end, duration, easing, sync = false) {
    if (typeof this.props[prop] == "number") {
      this.props[prop] = [
        [this.props[prop], this.props[prop], 0, 1, "linear"],
        [this.props[prop], end, cursor, cursor + duration, easing], //start value is current value
      ];
    } else {
      this.props[prop].push([
        this.props[prop][this.props[prop].length - 1][1], //start value is last animation's end value
        end,
        cursor,
        cursor + duration,
        easing,
      ]);
    }
    if (!sync) cursor += duration;
  }
  getState(frame) {
    let returnObj = {};
    for (let prop of Object.keys(this.props)) {
      if (!Array.isArray(this.props[prop])) {
        //Unanimated property
        returnObj[prop] = this.props[prop];
      } else {
        //Animated property

        for (let i = this.props[prop].length - 1; i >= 0; i--) {
          //Reverse looping all animations on that property
          if (this.props[prop][i][2] <= frame) {
            //pick latest animation that started before current frame
            returnObj[prop] = ease$(
              frame,
              this.props[prop][i],
              this.props[prop][4]
            );
            break;
          }
        }
      }
    }
    return returnObj;
  }
  display(p, frame) {
    //do smth
  }
}
