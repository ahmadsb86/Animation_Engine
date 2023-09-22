class rectShape extends shape {
  constructor(inputData) {
    super();
    this.props = {
      ...this.props,
      ...{
        w: 100,
        h: 100,
      },
      ...inputData,
    };
  }
  display(p, frame) {
    const currentState = this.getState(frame);
    p.push();
    p.stroke(currentState.stroke);
    p.strokeWeight(currentState.strokeWidth);
    let color = p.color(currentState.fill);
    color.setAlpha(currentState.opacity);
    p.fill(color);
    p.translate(currentState.x, currentState.y);
    p.scale(currentState.scale);
    p.rotate(currentState.rot);
    p.rect(0, 0, currentState.w, currentState.h);
    p.pop();
  }
}
