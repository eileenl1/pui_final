
let timer = 0;
let bugDirection = "right";
let bugList= [];
let rockList = [];
let bushList = [];
let treeimg;

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

// use images w p5.js

function setup() {
  createCanvas(windowWidth-110, windowHeight-150);
  background('rgba(234,255,221,0.25)');

  // create bug objects
  for (let i=0; i < 12; i++) {
    bugList[i] = new Bug();
  }

  //create rock objects
  for (let i=0; i < 8; i++) {
    rockList[i] = new Rock();
  }

  //create bush objects
  for (let i=0; i < 8; i++) {
    bushList[i] = new Bush();
  }

  loadImage('palmtree.png', img => {
    image(img, 100, 100, 100, 100);
  });
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
  for (let i=0; i < bugList.length; i++) {
    let bug = bugList[i];
    bug.move();
    bug.displayBug();
    bug.displayArrow(mouseX,mouseY);
}

  //draw rocks
  for (let i=0; i < rockList.length; i++) {
    let rock = rockList[i];
    rock.displayRock();
}

  // draw bricks 
  for (let i=0; i < bushList.length; i++) {
    let bush = bushList[i];
    bush.displayBush();
}

//draw info box
stroke(50, 100, 255);
strokeWeight(5);
rect(windowWidth-420, 10, 300, 250);
noStroke();
fill("#F0FFFF");
rect(windowWidth-410, 20, 280, 230);
// exit button to minimize info box
// read bugType from detectClick();, pick out appropriate html text and image to place in box?

// images are pixelated images of actual bugs, photoshop edits!

//image(treeimg, 100, 100, 100, 100);
}

// list of possible bugs generated
var bugTypes = ['ladybug', 'grasshopper', 'rolypoly', 'worm', 'cricket', 'centipede', 
'pincerbug', 'caterpillar', 'ant', 'beetle', 'slug', 'snail'];

//can click and interact w/ bug, rock, bush objects
function mousePressed() {
  for (let i=0; i < bugList.length; i++) {
    let bug = bugList[i];
    bug.detectClick(mouseX, mouseY);
  }
  for (let i=0; i < rockList.length; i++) {
    let rock = rockList[i];
    rock.shiftRock(mouseX,mouseY);
}
  for (let i=0; i < bushList.length; i++) {
    let bush = bushList[i];
    bush.shiftBush(mouseX,mouseY);
}
}

class Bug {
  // creating bug objects at random location
  // random location can't be close to edge of screen
  constructor() {
    this.x = math.floor(random(75, width-75));
    this.y = math.floor(random(75, height-75));
    this.speed = 0.1;
    this.bugType = random(bugTypes);
    this.hover = false;
  }

  // move bug to right 5 seconds, then move to left 5 seconds, repeat
  move() {
    if (bugDirection == "right") {
      this.x += this.speed;
      } else {
        this.x -= this.speed;
      }
    }
  
  detectClick(mouseX, mouseY) {
    if ((this.hover = true) && (abs(mouseX-(this.x+15))<40) && (abs(mouseY-(this.y+10))<40)) {
      //display bug info!
      console.log(this.bugType);
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

  displayArrow(mouseX, mouseY) { 
    //info filler
    if ((abs(mouseX-(this.x+15))<40) && (abs(mouseY-(this.y+10))<40)) {
      this.hover = true;
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
    this.x = math.floor(random(50, width-150));
    this.y = math.floor(random(50, height-50));
  }

  displayBush() {
    noStroke();
    fill("#479B5D");
    rect(this.x, this.y, 70, 70);
    fill("#7BD86C");
    rect(this.x+10, this.y+10, 10, 10);
    rect(this.x+50, this.y+30, 10, 10);
    rect(this.x+20, this.y+50, 10, 10);
  }

  shiftBush(mouseX, mouseY) {
    if ((abs(mouseX-(this.x+15))<40) && (abs(mouseY-(this.y+10))<40)) {
      this.x += 10;
    }
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
    fill("#778899");
    rect(this.x, this.y, 50, 50);
    }

  shiftRock(mouseX, mouseY) {
    if ((abs(mouseX-(this.x+15))<40) && (abs(mouseY-(this.y+10))<40)) {
      this.x += 10;
  }
}
}