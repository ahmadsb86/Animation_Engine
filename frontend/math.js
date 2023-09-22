class mathShape extends shape {
  constructor(inputData) {
    super();
    this.props = {
      ...this.props,
      ...{
        fontSize: 50,
        text: "x^2",
      },
      ...inputData,
    };
  }
  display(p, frame) {
    const currentState = this.getState(frame);
    p.push();
    if (currentState.strokeWidth > 0) p.stroke(currentState.stroke);
    p.strokeWeight(currentState.strokeWidth);
    let color = p.color(currentState.fill);
    color.setAlpha(currentState.opacity);
    p.fill(color);
    p.translate(currentState.x, currentState.y);
    p.rotate(currentState.rot);
    p.textSize(currentState.fontSize);
    p.text(currentState.text, 0, 0);
    p.pop();
  }
}
