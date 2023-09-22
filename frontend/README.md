# Motivation

I wrote some code in a repo called panim a few months ago
I don't know what it does because i didnt comment it goodly
I am so sad
But I like the idea of a fully client-side HTML5 canvas based 2d animation engine

# How it works

# Displaying

Display shapes on the screen is done using the p5.js library which itself is a wrapper for the HTML5 Canvas API. The p5.js library makes it much easier to work with the HTML5 Canvas API to draw pretty much anything on the screen.

# Set-up Phase

Whenever the page is reloaded, two phases of the program execute. The first is the set-up phase. The set-up phase is where the user-defiend `go()` function is called

The `go` function in turn calls other API functions (defined in `api.js`) such as `rect()`/`oval` which simply append a shape to the global array of all shapes, or such as `.move()` which add an animation to a shape instance. All animations added to a shape instance are added with the `startFrame` set to the value of `cursor` (a variable initally set at 0). `cursor` is only incremented after a call to an async API function.

# Storage of animations/properties

The `.anims` object stores each property (e.g. color, width, height) of a shape. If a specific property has a value of type array, that means that this property is animated. Such an array should only contain nested arrays each describing an animation with the following format

[startValue, endValue, startFrame, endFrame, easing]

# Play phase

Once the set-up phase is over and all animations have been added to the timeline, the play phase commences in which the animation is played frame by frame. For each shape, the state (an object representing properties of the shape such as x, y, width, height, etc.) is computed and then the shape is displayed. This process is repeated for each frame.
