class Planet {
  /**
    Creates a plnet object
    @param name The name of the planet
    @param mass The mass relative to Earth as a ratio
    @param avgDist The average Distence in Astonomical Units from the Sun
    @param color The color to display the planet
    @param startVelocity The inital velocity of the planet in km/s
  */
  constructor(name, mass, avgDist, color, startVelocity) {
    // Holds the raw value for Astronomical Units in m
    let AU = 149.6e6 * 1000;
    
    // Assigns the name and color
    this.name = name;
    this.color = color;
    
    // Converts the mass relative to Earth to a raw value
    this.mass = mass * 5.972 * 10 ** 24;
    
    // Computes the starting coordinates in raw values
    this.x = avgDist * AU;
    this.y = 1;

    // Assigns the intial velocity to x and y directions in m/s
    this.xVelocity = 0;
    this.yVelocity = startVelocity * 1000;
    
    // Stores the path traveled in the orbit and number of points
    this.path = [];
    this.points = 0;
    
    // Adds the start point to the orbital path
    this.updatePath();
  }
  
  /**
    Updates the velocity of the planets
  */
  changeVelocity(newXForce, newYForce) {
    // Stores the conversion of days to seconds
    let dayInSeconds = 60 * 60 * 24;
    
    // Updates the velocity values in the x and y directions
    this.xVelocity += (newXForce / this.mass * dayInSeconds);
    this.yVelocity += (newYForce / this.mass * dayInSeconds);
    
    // Updates the position
    this.setXY();
  }
  
  /**
    Updates the planets position
  */
  setXY () {
    // Stores the conversion of days to seconds
    let dayInSeconds = 60 * 60 * 24;
    
    // Changes the x and y values for position
    this.x += (this.xVelocity * dayInSeconds);
    this.y += (this.yVelocity * dayInSeconds);
    
    // Adds the current point to the orbital path
    this.updatePath();
  }
  
  /**
    Adds the current point of the planet 
    to a point that can bve displayed on the canvas
  */
  updatePath() {
    // Stores the value in m for an Astonomicasl Unit
    let AU = 149.6e6 * 1000;
    
    // Removes points if too many are stored for optimization
    if (this.path.length > 700) {
      this.path = this.path.slice(1,this.path.length);
    }
    
    // Adds every 8th point the planet has travelled to a list of points
    if (this.points % 8 == 0) {
      // Maps the point to a valid location on the canvas
      let newX = map(this.x, -31.5 * AU, 31.5 * AU, -width / 2, width / 2);
      let newY = map(this.y, -31.5 * AU, 31.5 * AU, -height / 2, height / 2);
    
      // Creates a new point
      this.path.push(createVector(newX, newY));
    }
    
    this.points++;
  }
}