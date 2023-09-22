//Global variables

cursor = 0; //this variable is used during the setup phase. It keeps track of the frame on which any new animation should be put on and incremented by async animation.
width = 0;
height = 0;
config = {
  WEBGL: true,
  videoLength: 360,
};
shapes$ = []; //The main man
shapeIndexCounter$ = 0; //index for next shape to be added to shapes$[]
//Note: the '$' suffix is used for global variables that end user will most likely never access and helps avoid naming conflicts

var $ = () => {
  //Wrapping everything in a function so that variables stay local

  //Local Variables
  let capture = false;
  let captureStart = false;
  let frame = 0;
  let frameSliderEl = document.getElementById("frameSlider");
  let fpsDisplayEl = document.getElementById("FPS");

  const sketch = (p) => {
    p5.disableFriendlyErrors = true;

    p.preload = () => {
      // Load a font for rendering text
      font = p.loadFont("./oswald.ttf");
    };

    p.setup = function () {
      if (typeof preGo != "undefined") {
        preGo();
      }

      const canvasElm = document.getElementById("p5Canvas");
      console.log(canvasElm);

      if (config.WEBGL) {
        p.createCanvas(1920, 1080, p.WEBGL2, canvasElm);
      } else {
        p.createCanvas(1920, 1080, canvasElm);
      }

      width = p.width;
      height = p.height;
      frameSliderEl.setAttribute("max", config.videoLength);

      if (typeof go != "undefined") {
        go();
      }

      p.textFont(font);
      p.rectMode(p.CENTER);
      p.angleMode(p.DEGREES);
      p.textAlign(p.CENTER);
    };

    p.draw = function () {
      // p.translate(p.width/2,p.height/2)   //move origin to center of screen

      //increment frame
      if (frame < config.videoLength) frame++;
      frameSliderEl.value = frame;

      //FPS Counter
      if (p.frameCount % 10 == 0) {
        fpsDisplayEl.innerHTML = p.nf(p.frameRate(), 2, 0).slice(0, -1);
      }

      //Display all shapes
      p.background(30);
      for (let shape of shapes$) {
        shape.display(p, frame);
      }

      //Capture stuff
      if (frame == 1 && capture) {
        capturer.start();
        captureStart = true;
      }
      if (frame < config.videoLength && captureStart) {
        capturer.capture(p.canvas);
      } else if (frame === config.videoLength && captureStart) {
        capturer.save();
        capturer.stop();
        captureStart = false;
        capture = false;
      }
    };
  };

  document.getElementById("capture").addEventListener("click", (e) => {
    frame = 0;
    capture = true;
  });

  frameSliderEl.addEventListener("input", (e) => {
    frame = frameSliderEl.value;
  });

  new p5(sketch);
};

$();
