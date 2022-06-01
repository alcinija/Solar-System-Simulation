// Declare the Solar System object
var solSys;

// Declares the slider for num days before update
var slider;

function setup() {
  // Creates the canvas and settings
  createCanvas(700, 700);
  background(0);
  strokeWeight(1);
  
  // Shifts the origin to the center
  translate(width / 2, height / 2);
  
  // Creates the slider to select day skips
  slider = createSlider(1, 100, 1);
  
  // Initializes the solar system
  solSys = new SolarSystem();
  
  // Draws the initial state of the solar system
  solSys.drawSystem();
}

/**
  Draws the solar system movements
*/
function draw() {
  // Redraws the background
  background(0);
  
  // Reshifts the origin
  translate(width / 2, height / 2);
  
  // Moves the planets positions
  solSys.movePlanets(slider.value());
  
  // Shows the new state of the system
  solSys.drawSystem();
}
