PVector centerStage;	//Creates a 2 or 3 dimesional geometric vector and stores it in the variable centerStage
final int NB_SQUARES = 110;	//Defines a constant value for the number of squares to be shown on the screen at once
final float RADIUS_STEP = 3;	//Defines a constant value for the change in 'radius' between each sequential square
final float Z_STEP = 7;	//Defines a constant value for the change in z corodinate for each square
final float RADIUS_MIN = 4;	//Defines a constant value for the minimum 'radius' of a square
final float MAX_ROTATION_SPEED = PI / 10;    //Defines a constant value for the max rotation speed of the squares/tabs
final float MIN_ANGLE = 0;	//Defines a constant value for the minimum angle between two squares/tabs
final float MAX_ANGLE = PI * 3;	//Defines a constant value for the maximum angle between two squares/tabs
final float MIN_DEFAULT_ANGLE = -PI / 20;	//Defines a constant value for the minimum default angle of the first square drawn
final float MAX_DEFAULT_ANGLE = PI / 20;	//Defines a constant value for the maximum default angle of the first square drawn
final float ANGLE_FRICTION = .7;	//Defines a constant value to scale the change in angle
final float NOISE_R = random(123456);	//Generates random value between 0 and 123456 for input to noise function to generate red colour component of squares
final float NOISE_G = random(123456);	//Generates random value between 0 and 123456 for input to noise function to generate green colour component of squares
final float NOISE_B = random(123456);	//Generates random value between 0 and 123456 for input to noise function to generate blue colour component of squares
final float NOISE_COLOR_STEP = .02;	//Defines constant value for the change in colour between each square

//Defines variables of type float array
float[] tabAngles;	//
float[] tabAngleSpeed;
float[] tabColorsR;
float[] tabColorsG;
float[] tabColorsB;

//Tweens
//rotation of the very first square
float originalRotation = MIN_ANGLE + (MAX_ANGLE - MIN_ANGLE) * random(1);
//color of the very first square
float originalColor = 256/2;
//default angle between two squares
float defaultAngle = MIN_DEFAULT_ANGLE + (MAX_DEFAULT_ANGLE - MIN_DEFAULT_ANGLE)*random(1);	//float of value between pi/20 and -pi/20
float defaultAngleEnd = MIN_DEFAULT_ANGLE + (MAX_DEFAULT_ANGLE - MIN_DEFAULT_ANGLE)*random(1);	

float MIN_TWEEN_DURATION = 3;	//A variable that is never used
float MAX_TWEEN_DURATION = 5;
final int MOUSE_MODE     = 0;	//integers used to switch between each mode
final int AUTO_MODE      = 1;
int currentMode          = AUTO_MODE;	//Sets start mode to always be automated and starts count at 0
int count = 0;

void setup()
{
  size(800, 600, P2D);	//Defines the size of the display window, setting the renderer to handle 2D graphics
  frameRate(25);	//Specifies the number of frame changes every second
  strokeWeight(2);	//Sets the width, in pixels, of the stroke used for lines, points and the border around shapes
  rectMode(CENTER);	//Changes the rect function so that its first two parameters are the co-ordinates of the shapes center and that the last two are the shapes width and height
  centerStage   = new PVector(width/2, height/2);	//Creates a 2D vector with x component half the value of the display window width, and y component half the value of the display window height

  //Defines float arrays of lenght NB_SQUARES
  tabAngles      = new float[NB_SQUARES];	//Defines float arrays of length NB_SQUARES
  tabColorsR     = new float[NB_SQUARES];
  tabColorsG     = new float[NB_SQUARES];
  tabColorsB     = new float[NB_SQUARES];
  tabAngleSpeed  = new float[NB_SQUARES];

  tabAngles[0]  = originalRotation;	//Sets first 'tab' to have rotation of originalRotation
  tabColorsR[0] = (random(255));	//Sets RGB components for each 'tab', each component has random value between 0 and 255
  tabColorsG[0] = (random(255));
  tabColorsB[0] = (random(255));
  for (int i = 0; i < NB_SQUARES; i++)
  {  
    tabAngles[i] = tabAngles[0] + i * defaultAngle;	//Sets the angle of each 'tab' relative to its predecessor
    tabAngleSpeed[i] = 0;	//Sets angle speed of all 'tabs' to be 0
  }
}

void changeAngle()
{
  tabColorsR[0] = noise(NOISE_R + count * NOISE_COLOR_STEP) * 255;	//NOISE values are constant, count increases by 1 every frame change, and NOISE_COLOUR_STEP is a constant that scales the movement 
									//in x for the noise function, therefore the change in colour with each frame is smooth. Output of noise then scaled for RGB values
  tabColorsG[0] = noise(NOISE_G + count * NOISE_COLOR_STEP) * 255;
  tabColorsB[0] = noise(NOISE_B + count * NOISE_COLOR_STEP) * 255;


  switch(currentMode)
  {
  case AUTO_MODE:
    tabAngles[0] = tweenValue((float)tabAngles[0], (float)originalRotation, random(.1));	//Sets the angle of the first square to be the difference between its current angle and its original, 
												 //scaled by a random value between 0 and .1
    if (abs((float)tabAngles[0] - (float)originalRotation) < .000001)	//If the newly calculated angle is effectively the same as the original angle then it is set to this and a new originalRotation is 
									//calculated
    {									//If not then the new angle remains what it is
      tabAngles[0] = originalRotation;
      originalRotation = MIN_ANGLE + (MAX_ANGLE - MIN_ANGLE) * random(1);
    }
    defaultAngle = tweenValue((float)defaultAngle, (float)defaultAngleEnd, random(.2));	//Sets the default spacing between two squares to be the scaled difference of the first squares current angle and 
											//that which it's moving towards
    if (abs((float)defaultAngle - (float)defaultAngleEnd) < .00001)	//If the angle between two squares has reached it's intended value then a new angle for it to approach is calculated
    {
      defaultAngleEnd = MIN_DEFAULT_ANGLE + (MAX_DEFAULT_ANGLE - MIN_DEFAULT_ANGLE)*random(1);
    }
    break;
  case MOUSE_MODE:
    tabAngles[0] = MIN_ANGLE + (MAX_ANGLE - MIN_ANGLE) * mouseX / width;	//In mouse mode the angle at which the first square is drawn is the proportion of the window the mouse has covered in x
    defaultAngle = MIN_DEFAULT_ANGLE + (MAX_DEFAULT_ANGLE - MIN_DEFAULT_ANGLE) * mouseY / height;	//Sets default angle between two squares to be proportional to how how far up the screen mouse is
    break;
  default:
    print("unexpected case");
    break;
  }

  for (int i = 1; i < NB_SQUARES; i++)
  {
    float prevAngle = tabAngles[i-1];	//Stores the angle of the square before it
    float currAngle = tabAngles[i];	//Stores the angle of the current square
    float deltaAngles = prevAngle - currAngle;	//Stores the difference in angle between the current square and the previous one
    tabAngleSpeed[i] = (deltaAngles + defaultAngle) * ANGLE_FRICTION;	//Calculates the speed at which the square must rotate

    if (tabAngleSpeed[i] > MAX_ROTATION_SPEED)
    {
      tabAngleSpeed[i] = MAX_ROTATION_SPEED;	//If speed needed is greater than what is allowed then it is set to the maximum it can be
    }
    else if (tabAngleSpeed[i] < -MAX_ROTATION_SPEED)
    {
      tabAngleSpeed[i] = -MAX_ROTATION_SPEED;	//This is the same condition but in the opposite direction
    }
    tabAngles[i] += tabAngleSpeed[i];	//Unit time of speed is same as time for frame to change therefore is change in angle

    tabColorsR[i] += (tabColorsR[i-1] - tabColorsR[i]) - 0x000001;	//Calculates change in colour for a square
    tabColorsG[i] += (tabColorsG[i-1] - tabColorsG[i]) - 0x000001;
    tabColorsB[i] += (tabColorsB[i-1] - tabColorsB[i]) - 0x000001;
  }
}

void draw()
{      
  background(0);	//Sets background colour to black
  stroke(0, 0, 0, 90);	//Sets stroke to be black with opacity of 90
  changeAngle();	//Calls changeAngle function
  translate(centerStage.x, centerStage.y);	//Defines the middle of the window to be the origin

  for (int i = NB_SQUARES-1; i >= 0; i--)
  {        
    fill(tabColorsR[i], tabColorsG[i], tabColorsB[i]);	//Sets colour of each square to be slightly different to the one prior to it

    float myRadius = RADIUS_MIN + i * RADIUS_STEP;	//Makes each rectangle slightly bigger than the one before it
    float myAngle = tabAngles[i];	//Sets myAngle to be the angle by which this square will be rotated 

    pushMatrix();	//Saves the current cordinate system
    rotate(myAngle);	//Rotates all objects after this point by myAngle
    translate(0, 0, -Z_STEP*i);	//Sets the orign to (x, y, z) coordinates given
    rect(0, 0, myRadius, myRadius);	//Draws a rectangle centered at the origin
    translate(0, 0, Z_STEP*i);	//resets the coordinate system, but isn't needed
    popMatrix();	//restores the original cordinate system
  }
  count++;
}

void mousePressed()
{
  currentMode = (currentMode == MOUSE_MODE) ? AUTO_MODE : MOUSE_MODE;
}

// value tweening function
public float tweenValue(float p_from, float p_to, float factor)	//User defined function that takes the start and finish location of a square along with a factor that will scale the difference of the 
								//other two inputs
{
  float result = p_to - p_from;	//Calculates the angle through which it will turn
  result *= factor;
  result += p_from;
  return result;
}

