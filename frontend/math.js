class mathShape extends shape {
  constructor(inputData) {
    super();
    this.props = {
      ...this.props,
      ...{
        fontSize: 24,
        MathJax: "x^2",
      },
      ...inputData,
    };

    var newDiv = document.createElement("div");
    newDiv.id = "output";
    newDiv.classList.add("absolute", "hidden", "text-white");
    this.elm = newDiv;

    document.body.appendChild(newDiv);

    newDiv.innerHTML = "";
    var options = MathJax.getMetricsFor(newDiv);
    MathJax.tex2svgPromise(this.props.MathJax, options).then((node) => {
      let SvgNode = node.firstChild;
      SvgNode.setAttribute(
        "width",
        parseInt(SvgNode.getAttribute("width").slice(0, -2)) * 5 + "ex"
      );
      SvgNode.setAttribute(
        "height",
        parseInt(SvgNode.getAttribute("height").slice(0, -2)) * 5 + "ex"
      );
      SvgNode.children[1].setAttribute("stroke", "white");
      SvgNode.children[1].setAttribute("fill", "white");
      this.ImageObjId = DataUrls$.length;
      DataUrls$.push(
        "data:image/svg+xml," + encodeURIComponent(SvgNode.outerHTML)
      );
    });
  }
  display(p, frame) {
    const currentState = this.getState(frame);
    p.push();
    p.translate(currentState.x, currentState.y);
    p.rotate(currentState.rot);
    p.scale((currentState.scale * 2) / 5);
    p.tint(255, currentState.opacity);
    p.image(ImageObjs$[this.ImageObjId], 0, 0);
    p.pop();
  }
}
