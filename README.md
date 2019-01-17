<<<<<<< HEAD
# p5-Summative.js
Original sketch: https://www.openprocessing.org/sketch/126399 by oggy

This project is licensed by https://creativecommons.org/licenses/by/3.0/legalcode

# BullsEye class

This class is that for the main rotating object seen on screen. It is made up of
a series of cuboids(each of a different colour) stacked on top of each other that
constantly rotate. Its depth can be changed exterior to the class by changing
the thickness of each cuboid, this can be triggered either when wanted or with use of
the oscillation method.

__Constructor__

  * Takes the singular parameter of surface which is either undefined or an offscreen
  graphics buffer. This is then stored as a property of the class and is accessed
  when drawing the bulls eye to determine whether it should be drawn to a graphics
  buffer or the canvas.
  * The constructor is then used to define all properties of the class, such as the number of layers, the
  maximum rotational speed of a cube and the rotation value of the top cube it is trying to reach.
  * Used to create all cuboid objects that will make up the bullsEye object each increasing in size.
  These are all stored in a list in the cuboids property.

__Draw__
  * Takes either a graphics buffer or undefined value as its parameter
  * Calls the draw method for each cuboid stored in the property cuboids, drawing each cube and in turn
  the whole bulls eye.
  * Within draw there is also the stroke and background functions, these both take the inputs of 0 that leads to them being black. The background function also cleans the
  p5 renderer every time it is called, thus stopping any overlapping with previously drawn sketches.
  * This same background function must be applied to the graphics buffer if draws parameter is defined.

__Oscillate__

  Calculates the new depth of the bulls eye by inputting the total number of frame changes so far
  into the sin function. This leads to a gradual change in output between -1 and 1 with each frame that
  passes. To slow the rate in change the input is scaled so that one full sin wave passes every 35 frames/
  one second. This output is then scaled, rounded and added to 10 giving a depth between 0 and 20. Every
  cuboid is then assigned this value.

__Set surface__

  * Takes either an undefined value or an offscreen graphics buffer as its parameter.
  * Assigns this parameter to the surface property of the class and that of every cuboid in the
  property cuboids. This is used to determine on which renderer the cubes should be drawn.

__Get surface__

  returns undefined value or an offscreen graphics buffer. Is used so which renderer is currently being used can be determined from outside the class.

__Set depth__

  * Takes the new value of depth for each cuboid as its parameter.
  * Uses this value to calculate overall depth of bullsEye, storing it in the depth property, and then
  changes the depth property value for each cuboid in the property cuboids.

__ChangeColour__

  Calculates the colour value of the first cuboid using the noise function. Its input is the total number
  of frame changes so far scaled by the colour step value of bullsEye, reducing the rate of change in
  colour. The use of noise also means that the change in value of colour is very smooth, yet also not
  easily predictable. The colour of the other cubes is simply the difference in colour between a cube and
  that before it minus one, added to the current colour value of that cube.

__ChangeAngle__

  Incrementally changes the angle of the first cube, rotating is closer to its intended angle, once
  negligibly far from it a new objective angle is calculated. The other cubes are all then rotated by the
  difference between their angle and that of the cube before, plus a value added at all rotations. This
  value is increased in magnitude every time change angle is called otherwise as the difference gets
  smaller the rotation speed would slow to near zero until a new objective angle was defined.

__CalcTween__

  * Takes the a starting angle, finishing angle and scaling factor as parameters
  * Scales the difference of the two angles and adds this value to the starting angle. This calculated
  value is then returned to be used else where.

# Cuboid

__Constructor__

  * The parameter dim defines the width and length of the cube, while the parameter depth defines its
  depth(by default this is zero). In addition to this the parameter z defines the cubes relative position
  in the z plane.
  * The parameter angle defines the angle at which the cube will be drawn.
  * The parameter surface is either undefined or an offscreen graphics buffer, determining onto which
  p5 renderer the cubes will be drawn.
  * The parameter colour is a list containing each RGB component of the cube, if undefined the colour
  property of the cube is set to [0, 0, 0]

__Set angle__

  Takes the value of a new angle for the cuboid to be drawn at as a parameter and stores it in the angle
  property of the cuboid object.

__Get angle__

  Means that the current angle of the cube can be accessed from outside the object.

__Set surface__

  Takes either an undefined value or a graphics buffer as its parameter and uses this to determine onto
  what p5 renderer the cube will be drawn, when drawn.

__Set depth__

  Used to change the depth of a cube from outside the object. This new depth is passed in as the
  parameter of the method.

__Set colour__

  Sets what the colour of the cube will be when drawn, the value to be used is passed in as the parameter
  of the method.

__Get colour__

  Returns the value stored in the colour property of the object so to be used outside of the object.

__Draw__

  Starts by specifying the colour of the cube using the fill function, inputting each RGB component in
  the colour property. Executes the same operations but drawing onto two different renderer objects. One
  draws directly to the canvas while the other draws to an off screen buffer. Each cube
  is drawn on top of the previous by displacing the object to be drawn by its depth multiplied by its z
  value and rotating it by its angle calculated in bullsEye. The original coordinate system of the canvas
  is saved by push and then restored after drawing the cube using pop.


# Example application

This particular application creates a bullsEye object and then enables the user to choose how it is viewed
using html inputs. Event listeners are used to access the value of an input when its value changes
leading to varying effects.

__Change Depth__

The first input is a slider of values in the range 0 to 20. When changed by the user the event listener
attached to the input calls a function that sets the depth property of the bullsEye object to equal the
current value of the slider. This means that when drawn the bullsEye will have this depth.

__Change Zoom__

This input is a again slider of values, yet this time from 200 to 5000. As before when the input is
changed by the user the event listener attached to the slider calls a function. However, in this case the
function sets the zoomValue variable to 5200 minus the current value of the slider. This subtraction is
required as a larger input to the camera(creating the zoom effect) leads to it being moved further away
and thus zooming out instead of in, therefore, the scale must be flipped. This value is inputted into the
camera function as its z position in the draw function later.

__Change Angle__

The angle input is the last slider to be used, this time with values ranging from -800 to 800. Yet again
an event listener is attached to the slider and calls a function when the input changes. The function
that this event listener then calls simply sets the variable angleValue to the value of the slider. This
variable is then later used to define the x position of the camera in the draw function.

__Change Oscillation__

This input is not a slider but a check box, which when clicked calls the function changeOscillation with
use of an event listener and sets the value of oscillate to be true if it is ticked and false if not. If
true then the oscillate method of bullsEye is called in every call of the draw function, until the box is
unticked again.

__Cube__

This is again a checkbox input, when clicked it leads to changeToCube being called. If the box is ticked then an offscreen graphics buffer is created and assigned to the property 'surface' in bullsEye, if not ticked it is made undefined. This means that when the draw function is called if surface is defined then all cubes are drawn to the graphics buffer which is then used as a texture for a rotating box. If, however, it is not defined then bullsEye object is simply just drawn onto the canvas.
=======
# Durham p5 Library

A library of reusable components for [p5js](https://p5js.org/). These are developed by the 1st Year Programming class at Durham University.

## Instructions for adding components

- Fork this repository
- Create a subdirectory of the main repository named after your component containing
   - A `.js` file containing the relevant class definition
   - A `.html` file which uses the .js file and demonstrates its use
   - A `README.md` file which contains the documentation for the class
- Once everything is complete (including peer review) make a pull request from your forked repository to <https://github.com/stevenaeola/Durham-p5-lib>
>>>>>>> 6fcae8252f52838565589544ebb30f8e433fd622
