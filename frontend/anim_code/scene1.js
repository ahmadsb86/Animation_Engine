function preGo() {
  setConfig({
    videoLength: 500,
  });
}

function go() {
  wait(100);
  math({
    x: width / 2,
    y: height / 2 - 200,
    MathJax: String.raw`x = {-b \pm \sqrt{b^2-4ac} \over 2a}`,
  });
  wait(100);
  math({
    x: width / 2,
    y: height / 2,
    MathJax: String.raw`x = 2b({  +b \pm \sqrt{b^2-4ac} \over 2a  })`,
  });
  wait(100);
  math({
    x: width / 2,
    y: height / 2 + 200,
    MathJax: String.raw`x = 2a^{-1}({-b \pm \sqrt{b^2-4ac}})`,
  });
}
