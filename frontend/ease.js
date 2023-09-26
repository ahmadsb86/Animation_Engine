let ease$ = (frame, animationData) => {
  let constrain = function (n, low, high) {
    return Math.max(Math.min(n, high), low);
  };

  const startVal = animationData[0];
  const endVal = animationData[1];
  const startFrame = animationData[2];
  const endFrame = animationData[3];
  const currentFrame = constrain(frame, startFrame, endFrame);
  const easing = animationData[4];

  //progress b/w 0 and 1
  const progress = (currentFrame - startFrame) / (endFrame - startFrame);

  switch (easing) {
    case "linear":
      return startVal + (endVal - startVal) * progress;
      break;

    case "ease":
      const cubicBezier = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const easedProgress = cubicBezier(progress);

      return startVal + (endVal - startVal) * easedProgress;
      break;

    default:
      break;
  }

  // function easeInOutTransition(
  //   startValue,
  //   endValue,
  //   startFrame,
  //   endFrame,
  //   currentFrame
  // ) {
  //   // Ensure the current frame is within the bounds of startFrame and endFrame.
  //   currentFrame = constrain(currentFrame, startFrame, endFrame);

  //   // Calculate the progress within the range [0, 1].
  //   const progress = (currentFrame - startFrame) / (endFrame - startFrame);

  //   // Apply the cubic bezier curve for ease-in-out transition.
  //   const cubicBezier = (t) =>
  //     t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  //   const easedProgress = cubicBezier(progress);

  //   // Interpolate between startValue and endValue using the eased progress.
  //   const interpolatedValue = startVal + (endVal - startVal) * easedProgress;

  //   return interpolatedValue;
  // }

  // if (easing == "linear")
  //   return map(frame, startFrame, endFrame, startVal, endVal, true);
  // if (easing == "ease") return easeInOutTransition();
};
