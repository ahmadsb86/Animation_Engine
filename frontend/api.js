/**
 * Create a rectangle
 */
function rect(...arguments) {
  // Params can be any of the following
  // rect()
  // rect(x,y)
  // rect(pos)
  // rect(x,y,w,h)
  // rect(pos,w,h)
  // Any of the above permutations can also have an optional config object as the last param (or as the sole object) which includes additional configuration such as color, border, etc.

  console.log(arguments);
  let options = {};

  for (let arg of arguments) {
    if (typeof arg == "object") {
      options = { ...options, ...arg };
    }
  }

  //TODO: Make this neater
  if (arguments.length >= 2 && typeof arguments[0] == "number") {
    //x and y are given as seperate integers
    options.x = arguments[0] * width;
    options.y = arguments[1] * height;
    if (arguments.length >= 4 && typeof arguments[2] == "number") {
      options.w = arguments[2] * width;
      options.h = arguments[3] * height;
    }
  } else if (arguments.length >= 3 && typeof arguments[1] == "number") {
    //x and y are given as object while w and h are given as seperate integers
    options.w = arguments[1] * width;
    options.h = arguments[2] * height;
  }

  console.log(options);

  return createShape$("rect", options);
}

function text(options) {
  console.log(arguments);

  return createShape$("text", options);
}

function math(options) {
  console.log(arguments);

  return createShape$("math", options);
}

function createShape$(type, options) {
  let shape;
  switch (type) {
    case "rect":
      shape = new rectShape({
        ...options,
      });
      break;
    case "text":
      shape = new textShape({
        ...options,
      });
      break;
    case "math":
      shape = new mathShape({
        ...options,
      });
      break;

    default:
      break;
  }

  shape.addAnim("opacity", 255, 10, "ease", true); //add a fade in effect to all elms
  shape.addAnim("y", options.y - 10, 20, "ease", true); //add a slight move it in effect to all elms

  shapes$.push(shape);
  return shape;
}

function coord(x, y) {
  return {
    x: x,
    y: y,
  };
}

function wait(duration) {
  cursor += duration;
}

function setConfig(input) {
  config = {
    ...config,
    ...input,
  };
}

function rgb(red, green, blue) {
  // Make sure the input values are within valid ranges (0-255)
  red = Math.min(255, Math.max(0, red));
  green = Math.min(255, Math.max(0, green));
  blue = Math.min(255, Math.max(0, blue));

  // Convert the values to hexadecimal strings
  const redHex = red.toString(16).padStart(2, "0");
  const greenHex = green.toString(16).padStart(2, "0");
  const blueHex = blue.toString(16).padStart(2, "0");

  // Concatenate the hex values to form the final hex string
  const hexString = `#${redHex}${greenHex}${blueHex}`;

  return hexString.toUpperCase(); // Convert to uppercase for consistency
}
