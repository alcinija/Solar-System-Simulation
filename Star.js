class Star {
  /**
    Creates a star object
    @param name The name of the star
    @mass Mass realtive to the sun
    @color The color to draw the star
  */
  constructor(name, mass, color) {
    // Assigns the name and color
    this.name = name;
    this.color = color;
    
    // Calculates the true mass value
    this.mass = mass * 1.989 * 10 ** 30;
    
    // Sets the poisition to the center of the canvas
    this.x = 0;
    this.y = 0;
  }
}