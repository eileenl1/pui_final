
let timer = 0;
let bugDirection = "right";
let bugList= [];
let rockList = [];
let bushList = [];
let bugsFound = [];
let bugTypeClick;
let magnifyToggle = "on";
let glossaryToggle = "off";

//create bug GIF variables
var ant, beetle, caterpillar, centipede, cricket, grasshopper, 
worm, ladybug, rolypoly, pincerbug, slug, snail;

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
  createCanvas(windowWidth-70, windowHeight-150);
  background('rgba(234,255,221,0.25)');

  // create bug objects
  for (let i=0; i < 14; i++) {
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

  // set up photo files of bugs
  ant = createImg('img_assets/ant.gif');
  beetle = createImg('img_assets/beetle.gif');
  caterpillar = createImg('img_assets/caterpillar.gif');
  centipede = createImg('img_assets/centipede.gif');
  cricket = createImg('img_assets/cricket.gif');
  grasshopper = createImg('img_assets/grasshopper.gif');
  worm = createImg('img_assets/worm.gif');
  ladybug = createImg('img_assets/ladybug.gif');
  rolypoly = createImg('img_assets/pillbug.gif');
  pincerbug = createImg('img_assets/pincerbug.gif');
  slug = createImg('img_assets/slug.gif');
  snail = createImg('img_assets/snail.gif');

  // adjust size of bug GIF files
  ant.size(250,150);
  beetle.size(250,150);
  caterpillar.size(250,150);
  centipede.size(250,150);
  cricket.size(250,150);
  grasshopper.size(250,150);
  worm.size(250,150);
  ladybug.size(250,150);
  rolypoly.size(250,150);
  pincerbug.size(250,150);
  slug.size(250,150);
  snail.size(250,150);

  // load other img assets
  magnify = loadImage('img_assets/Magnify.png');
  book = loadImage('img_assets/book.png');
  award = loadImage('img_assets/award.png');

  // load font
  connectionFont = loadFont('Connection.otf');
}

function windowResized() {
  resizeCanvas(windowWidth-100, windowHeight-100);
}

function drawInfoBox() {
  //draw info box
  stroke(50, 100, 255);
  strokeWeight(5);
  rect(windowWidth-420, 10, 300, 400);
  noStroke();
  fill("#FFFFFF");
  rect(windowWidth-410, 20, 280, 380);
  stroke("#5C62F0");
  line(windowWidth-390, 180, windowWidth-149, 180);
}

function hideGIFS() {
  // hide GIF images until needed
  ant.hide();
  beetle.hide();
  caterpillar.hide();
  centipede.hide();
  cricket.hide();
  grasshopper.hide();
  worm.hide();
  ladybug.hide();
  rolypoly.hide();
  pincerbug.hide();
  slug.hide();
  snail.hide();
}

function listBugsFound() {
  // create list of bugs found so far
  fill(50, 100, 255);
  textSize(18);
  for (let i=0; i < bugsFound.length; i++){
    text(bugsFound[i],windowWidth-400, 80+(i*30));
  }
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
    rock.showRock(mouseX, mouseY);
}

  // draw bus
  for (let i=0; i < bushList.length; i++) {
    let bush = bushList[i];
    bush.displayBush();
    bush.showBush(mouseX, mouseY);
}

// hide GIF images until needed
hideGIFS();

if (magnifyToggle == "on") {
  drawInfoBox();
  //text customization
  noStroke();
  fill("#ff8f1f");
  textSize(24);
  textFont(connectionFont);

  // show appropriate GIF image and text of bug when clicked
  if (bugTypeClick == "ant") {
    ant.show();
    ant.position(windowWidth-365, 170, 250, 150);
    text("Formicidae aka Ant. Very strong, can carry a sugarcube 5000x its own weight.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "beetle") {
    beetle.show();
    beetle.position(windowWidth-365, 170, 250, 150);
    text("Coleoptera aka Beetle. Can chew mostly anything. Good at biting, but probably won't bite you :-) ", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "caterpillar") {
    caterpillar.show();
    caterpillar.position(windowWidth-365, 170, 250, 150);
    text("Lepidoptera aka Caterpillar. Will bloom into a beautiful butterfly.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "centipede") {
    centipede.show();
    centipede.position(windowWidth-365, 170, 250, 150);
    text("Chilopoda, includes Centipede. Has less legs than a millipede.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "cricket") {
    cricket.show();
    cricket.position(windowWidth-365, 170, 250, 150);
    text("Orthopteran aka Cricket. Rub their legs together to chirp, and because it's cold.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "grasshopper") {
    grasshopper.show();
    grasshopper.position(windowWidth-365, 170, 250, 150);
    text("Caelifera aka Grasshopper. Probably the oldest living group of chewing herbivorous bug.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "worm") {
    worm.show();
    worm.position(windowWidth-365, 170, 250, 150);
    text("Nematoda aka Worm. Probably won't hurt you. Squiggles.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "ladybug") {
    ladybug.show();
    ladybug.position(windowWidth-365, 170, 250, 150);
    text("Coccinellidae aka Ladybug. The spots don't mean anything, they're just pretty.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "rolypoly") {
    rolypoly.show();
    rolypoly.position(windowWidth-365, 170, 250, 150);
    text("Armadillidium vulgare aka Roly Poly, or pillbug. Rolls up when scared.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "pincerbug") {
    pincerbug.show();
    pincerbug.position(windowWidth-365, 170, 250, 150);
    text("Dermaptera aka pincerbug, or earwig. Might pinch you, likes to hide under couches.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "slug") {
    slug.show();
    slug.position(windowWidth-365, 170, 250, 150);
    text("Pulmonata aka Slug. Distant cousin of a snail. Cannot afford a house.", windowWidth-390, 200, 270, 270);
  } else if (bugTypeClick == "snail") {
    snail.show();
    snail.position(windowWidth-365, 170, 250, 150);
    text("Shelled gastropod aka Snail. Known for being slow, and patient.", windowWidth-390, 200, 270, 270);
  } else {
    return false;
  }

  // explanation of award for finding more than half the bugs
  if (bugsFound.length > 6) {
    textSize(14);
    fill("#FFFFFF");
    rect(windowWidth-410, 420, 278, 55);
    fill(106, 68, 212);
    text("Congrats! You discovered more than half the bugs. Here's a badge for your efforts.", windowWidth-400, 425, 280, 300);
  }

  if (glossaryToggle == "on") {
    awardToggle = "off";
    // turn off animations
    hideGIFS();
    // new drawing
    drawInfoBox();
    fill("#FFFFFF");
    noStroke();
    rect(windowWidth-400, 170, 255, 50);
    fill("#ff8f1f");
    textSize(24);
    textFont(connectionFont);
    // text for glossary with list of bugs found
    text("Glossary: Bugs Found",windowWidth-400, 50);
    listBugsFound();
    }
}

// draw magnifying glass (toggle on/off)
image(magnify, windowWidth-115, 15, 40, 40);
image(book, windowWidth-111, 70, 30, 30);
// reward user if they found more than half the bugs
if (bugsFound.length > 6) {
  image(award, windowWidth-111, 120, 30, 40);
}
}

// list of possible bugs generated
var bugTypes = ['ladybug', 'grasshopper', 'rolypoly', 'worm', 'cricket', 'centipede', 
'pincerbug', 'caterpillar', 'ant', 'beetle', 'slug', 'snail'];

// can click and interact w/ bug, rock, bush objects
function mousePressed() {
  for (let i=0; i < bugList.length; i++) {
    let bug = bugList[i];
    bug.detectClick(mouseX, mouseY);
  }
  for (let i=0; i < rockList.length; i++) {
    let rock = rockList[i];
    rock.pressRock(mouseX,mouseY);
}
  for (let i=0; i < bushList.length; i++) {
    let bush = bushList[i];
    bush.pressBush(mouseX,mouseY);
} 
  bugInfoToggle(mouseX, mouseY);
  bugGlossaryToggle(mouseX, mouseY);
}

// can drag and release rock, bush objects
function mouseReleased() {
  for (let i=0; i < bushList.length; i++) {
    let bush = bushList[i];
    bush.notPressed();
  } 
  for (let i=0; i < rockList.length; i++) {
    let rock = rockList[i];
    rock.notPressed();
  } 
}

function bugInfoToggle(mouseX, mouseY) {
  // toggle magnifying glass to view/hide bug info
  if ((abs(mouseX-(windowWidth-115))<40) && (abs(mouseY-(15))<40)) {
    if (magnifyToggle == "on") {
      magnifyToggle = "off";
    } else if (magnifyToggle == "off") {
      magnifyToggle = "on";
    }
  }
}

function bugGlossaryToggle(mouseX, mouseY) {
  // toggle glossary to view/hide bug glossary 
  if ((abs(mouseX-(windowWidth-111))<30) && (abs(mouseY-(70))<30)) {
    if (glossaryToggle == "on") {
      glossaryToggle = "off";
    } else if (glossaryToggle == "off") {
        glossaryToggle = "on"
    }
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
    windowWidth-115, 15, 40, 40
    if ((this.hover = true) && (abs(mouseX-(this.x+15))<40) && (abs(mouseY-(this.y+10))<40)) {
      //display bug info!
      console.log(this.bugType);
      bugTypeClick = this.bugType;
      // add bug to glossary if not in list
      if (bugsFound.includes(this.bugType) == false) {
        bugsFound.push(this.bugType);
      }
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
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
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

  showBush (mouseX, mouseY) {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  // can drag and release bush
  pressBush(mouseX, mouseY) {
    if ((abs(mouseX-(this.x+15))<40) && (abs(mouseY-(this.y+10))<40)) {
      this.dragging = true;
      this.offsetX = this.x-mouseX;
      this.offsetY = this.y-mouseY;
    }
  }

  notPressed() {
    this.dragging = false;
  }
}

// create Rock class
class Rock {
  constructor() {
    this.x = math.floor(random(50, width-50));
    this.y = math.floor(random(50, height-50));
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
  }

  displayRock() {
    noStroke();
    fill("#778899");
    rect(this.x, this.y, 50, 50);
    }

  showRock (mouseX, mouseY) {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  // can drag and release rock
  pressRock(mouseX, mouseY) {
    if ((abs(mouseX-(this.x+15))<40) && (abs(mouseY-(this.y+10))<40)) {
      this.dragging = true;
      this.offsetX = this.x-mouseX;
      this.offsetY = this.y-mouseY;
    }
  }

  notPressed() {
    this.dragging = false;
  }
}