
let timer = 0;
let bugDirection = "right";
let bugList= [];

//wave variables
let w = 2000;
let h = 1400;
let scl = 24;
let cols;
let rows;
let yoff = 0.0;
let margin = 10;
cols = (w - margin * 2) / scl;
rows = (h - margin * 2) / scl;

function setup() {
  createCanvas(windowWidth-110, windowHeight-180);
  background('rgba(234,255,221,0.25)');

  // create bug objects
  bug1 = new Bug();
  bug2 = new Bug();
  bug3 = new Bug();
  bug4 = new Bug();
  bug5 = new Bug();
  bug6 = new Bug();
  bug7 = new Bug();
  bug8 = new Bug();
  bug9 = new Bug();
  bug10 = new Bug();
  bug11 = new Bug();
  bug12 = new Bug();
  
  bugList.push(bug1, bug2, bug3, bug4, bug5, bug6, bug7, 
    bug8, bug9, bug10, bug11, bug12);
  
  for (bug in bugList) { 
  /* 
   add onclick handler for bug
  */
  }

  /* check overlap, remove overlapping bug objects

  function checkOverlap(object1, object2, list) {
    if ((Math.abs(object1.x-object2.x))<80 && (Math.abs(object1.y-object2.y)<80)) {
      list.pop(object1);
    }
  }
  for (bug in bugList) {
    checkOverlap(bug, )
  }
  */

  //create rock objects
  rock1 = new Rock();
  rock2 = new Rock();
  rock3 = new Rock();
  rock4 = new Rock();
  rock5 = new Rock();
  rock6 = new Rock();
  rock7 = new Rock();
  rock8 = new Rock();

  //create bush objects
  bush1 = new Bush();
  bush2 = new Bush();
  bush3 = new Bush();
  bush4 = new Bush();
  bush5 = new Bush();
  bush6 = new Bush();
  bush7 = new Bush();
  bush8 = new Bush();
}

function windowResized() {
  resizeCanvas(windowWidth-100, windowHeight-100);
}

function draw() {
  background(234, 255, 221);

  //draw background bushes
  noStroke();
  fill("#7BD86C");
  rect(5, 50, 200, 300);
  rect(5, 150, 400, 200);
  rect(1000, 0, 200, 400);
  rect(300, 500, 400, 100);
  rect(900, 0, 300, 200);
  rect(800, 250, 100, 150);

  //draw background Waves
  //referenced from (https://editor.p5js.org/rapley/sketches/BK_8BfvDk)
  let xoff = 0.0;
  
  for (let y = 0; y <= h; y += scl) {
    strokeWeight(1.5);
    stroke(50, 100, 255);
    noFill();
    beginShape();
    for (let x = 0; x <= w; x += scl) {
    	let noiseScale = map(noise(x * xoff, yoff), 0, 1, -20, 20)
			curveVertex(x + margin, (y + noiseScale) + margin);
      xoff += 0.000009;
    }
    yoff += 0.0003;

    endShape();
  }

  // bugs switch positions
  timer++;
  if (timer%500 == 0) {
    if (bugDirection == "right") {
      bugDirection = "left";
      } else {
        bugDirection = "right";
      }
    }

  // animate bugs
  bug1.move();
  bug1.displayBug();
  bug1.displayInfo(mouseX, mouseY);
  bug2.move();
  bug2.displayBug();
  bug2.displayInfo(mouseX, mouseY);
  bug3.move();
  bug3.displayBug();
  bug3.displayInfo(mouseX, mouseY);
  bug4.move();
  bug4.displayBug();
  bug4.displayInfo(mouseX, mouseY);
  bug5.move();
  bug5.displayBug();
  bug5.displayInfo(mouseX, mouseY);
  bug6.move();
  bug6.displayBug();
  bug6.displayInfo(mouseX, mouseY);
  bug7.move();
  bug7.displayBug();
  bug7.displayInfo(mouseX, mouseY);
  bug8.move();
  bug8.displayBug();
  bug8.displayInfo(mouseX, mouseY);
  bug9.move();
  bug9.displayBug();
  bug9.displayInfo(mouseX, mouseY);
  bug10.move();
  bug10.displayBug();
  bug10.displayInfo(mouseX, mouseY);
  bug11.move();
  bug11.displayBug();
  bug11.displayInfo(mouseX, mouseY);
  bug12.move();
  bug12.displayBug();
  bug12.displayInfo(mouseX, mouseY);
  

  //draw rocks
  rock1.displayRock();
  rock2.displayRock();
  rock3.displayRock();
  rock4.displayRock();
  rock5.displayRock();
  rock6.displayRock();
  rock7.displayRock();
  rock8.displayRock();

  // draw bricks 
  bush1.displayBush();
  bush2.displayBush();
  bush3.displayBush();;
  bush4.displayBush();
  bush5.displayBush();
  bush6.displayBush();
  bush7.displayBush();
  bush8.displayBush();
}

// list of possible bugs generated
var bugTypes = ['ladybug', 'grasshopper', 'rolypoly', 'worm', 'cricket', 'centipede', 
'pincerbug', 'caterpillar', 'ant', 'beetle', 'slug', 'snail'];

class Bug {
  // creating bug objects at random location
  // random location can't be close to edge of screen
  constructor() {
    this.x = math.floor(random(75, width-75));
    this.y = math.floor(random(75, height-75));
    this.speed = 0.1;
    this.bugType = random(bugTypes);
  }

  // move bug to right 5 seconds, then move to left 5 seconds, repeat
  move() {
    if (bugDirection == "right") {
      this.x += this.speed;
      } else {
        this.x -= this.speed;
      }
    }

  displayBug() {
    // bug drawing
    noStroke();
    fill(47, 79, 79);
    rect(this.x, this.y, 30, 20);
    rect(this.x, this.y+20, 3, 4);
    rect(this.x+7, this.y+20, 3, 4);
    rect(this.x+14, this.y+20, 3, 4);
    rect(this.x+21, this.y+20, 3, 4);
    rect(this.x+27, this.y+20, 3, 4);
  }

  displayInfo(mouseX, mouseY) { 
    //info filler
    if ((abs(mouseX-(this.x+15))<40) && (abs(mouseY-(this.y+10))<40)) {
      noStroke();
      fill("#ff8f1f");
      rect(this.x+13.5, this.y-28, 5, 18);
      triangle(this.x+8, this.y-10, this.x+24, this.y-10, this.x+16, this.y);
    }
  }
}

// create Bush class
class Bush {
  constructor() {
    this.x = math.floor(random(50, width-50));
    this.y = math.floor(random(50, height-50));
  }

  displayBush() {
    noStroke();
    fill("#479B5D");
    rect(this.x, this.y, 70, 70);
  }

  shiftBush() {
    this.x += 100;
  }
}

// create Rock class
class Rock {
  constructor() {
    this.x = math.floor(random(50, width-50));
    this.y = math.floor(random(50, height-50));
  }

  displayRock() {
    noStroke();
    fill("#C3C3B8");
    rect(this.x, this.y, 50, 50);
    }

  shiftRock() {
    this.x += 100;
  }
}