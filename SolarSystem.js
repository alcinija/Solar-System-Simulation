class SolarSystem {
  /**
    Creates an Object the represents a
    Solar System that stores a star and planets
  */
  constructor() {
    // Creates the Sun as a Star
    this.sun = new Star("Sol", 1, color(255, 255, 0));
    
    // Creates the 8 planets
    this.createPlanets();
  }
  
  /**
    Creates the 8 planets in the solar system
    stores the planets in an array
  */
  createPlanets() {
    // Stores the planets
    this.planets = [];
    
    // Creates each planet with real values
    let mercury = new Planet("Mercury", 0.055, 0.387, color(105, 105, 105), -47.4);
    let venus = new Planet("Venus", 0.815, 0.72, color(255, 153, 51), 35.0);
    let earth = new Planet("Earth", 1, 1, color(0, 0, 255), -29.8);
    let mars = new Planet("Mars", 0.107, 1.5, color(255, 0, 0), -24.1);
    let jupiter = new Planet("Jupiter", 317.8, 5.2, color(255, 153, 0), -13.1);
    let saturn = new Planet("Saturn", 95.16, 9.5, color(255, 204, 0), -9.7);
    let uranus = new Planet("Uranus", 14.54, 19.2, color(187, 225, 228), 6.8);
    let neptune = new Planet("Neptune", 17.15, 30.06, color(41, 144, 181), -5.4);

    // Adds the planets to the list
    this.planets.push(mercury);
    this.planets.push(venus);
    this.planets.push(earth);
    this.planets.push(mars);
    this.planets.push(jupiter);
    this.planets.push(saturn);
    this.planets.push(uranus);
    this.planets.push(neptune);
  }

  /** 
    Draws the current positions of the planets,
    sun, and orbit paths
  */
  drawSystem() {
    this.drawSun();
    this.drawPlanets();
    this.drawPaths();
  }

  /**
    Draws the Sun
  */
  drawSun() {
    // Sets the color for the sun
    fill(this.sun.color);
    stroke(this.sun.color);
    
    // Draws the sun
    circle(0, 0, 9);
  }

  /**
    Draws the planets in the correct locations
    @param displayCounts Show counters on the drawing
  */
  drawPlanets(displayCounts) {
    // Stores the value for an Astonomical Unit
    let AU = 149.6e6 * 1000;
    
    // Loops through the planets
    for (let i = 0; i < this.planets.length; i++) {
      // Sets the color for the planets
      fill(this.planets[i].color);
      stroke(this.planets[i].color);
      
      // Maps the points to a valid location
      let newX = map(this.planets[i].x, -31.5 * AU, 31.5 * AU, -width / 2, width / 2);
      let newY = map(this.planets[i].y, -31.5 * AU, 31.5 * AU, -height / 2, height / 2);
      
      // Draws the planet
      circle(newX, newY, 4);
    }
  }
  
  /**
    Draws the orbital paths of each planet
  */
  drawPaths() {
    // Loops through the planets 
    for (let i = 0; i < this.planets.length; i++) {
      // Sets the line color
      stroke(this.planets[i].color);
      
      // Loops through the points in the orbital path
      for (let j = 1; j < this.planets[i].path.length; j++) {
        // Draws the line
        line(this.planets[i].path[j-1].x, this.planets[i].path[j-1].y,
             this.planets[i].path[j].x, this.planets[i].path[j].y);
      }
    }
  }
  
  /**
    Gets the force acted on by all other 
    bodies in the system using general realativity
    @param mives The amount of days simulated before drawing
  */
  movePlanets(moves) {
    // Simulates the number of days
    for (let k = 0; k < moves; k++) {
      // Stores the forces in the x and y directions
      let newXForces = [];
      let newYForces = [];

      // Loops through the list of planets
      for (let i = 0; i < this.planets.length; i++) {
        // Calculates the force the sun puts on the planets
        let sunForce = this.calcGravityForce(this.sun, this.planets[i]);

        // Intializes the total force in the system starting with the sun
        let totalForceX = sunForce[0];
        let totalForceY = sunForce[1];

        // Loops through the other planets
        for (let j = 0; j < this.planets.length; j++) {
          if (this.planets[i].name !== this.planets[j].name) {
            // Gets the force between the two planets in the x and y directions
            let currentForce = this.calcGravityForce(this.planets[i], this.planets[j]);

            // Adds the resulting forces
            totalForceX = totalForceX + currentForce[0];
            totalForceY = totalForceY + currentForce[1];
          }
        }

        // Pushes the final forces to the list
        newXForces.push(totalForceX) 
        newYForces.push(totalForceY);
      }

      // Updates velocity of every planet after calulating all forces
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].changeVelocity(newXForces[i], newYForces[i]);
      }
      
      // Adds 1 day from the start of the simulation
      this.days++;
    }
  }
  
  /**
    Calculates the force two bodies
    put on each other
    @param planet1 The first planet being compared
    @param planet2 The other planet being compared
    @return Array with x and y forces
  */
  calcGravityForce(planet1, planet2) {
    // The value for the univerasal gravitation constant
    let G = 6.67428e-11;
    
    // Calulates the distance in the x and y direction
    let xDist = planet2.x - planet1.x;
    let yDist = planet2.y - planet1.y;
    
    // Calculates the straight line distance
    let radius = dist(planet1.x, planet1.y, planet2.x, planet2.y);
    
    // Calculates the angle using arc tangent
    let angle = atan2(yDist, xDist);
    
    // Calculates the total force between the two planets
    let force = G * planet1.mass * planet2.mass / (radius * radius);
    
    // Calculates force in x and y directions
    let forceX = -1 * force * cos(angle);
    let forceY = -1 * force * sin(angle);
    
    // Returns the forces as an array of the two values
    return [forceX, forceY];
  }
}
