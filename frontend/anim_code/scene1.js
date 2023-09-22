function preGo() {
  setConfig({
    videoLength: 500,
  });
}

function go() {
  wait(30);
  text({
    x: width / 4,
    y: height / 2,
    text: "sum_(i=1)^n i^3=((n(n+1))/2)^2",
  }).addAnim("rot", 720, 160, "linear", true);
  rect(0.75, 0.5, { fill: "#cc4444" }).addAnim("rot", 720, 160);
}
