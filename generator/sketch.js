let backgd;
let wordData;

function preload() {
  backgd = loadImage("artwork and label.png");
  wordData = loadJSON("data.json");
}

let bubbles = [];
let lines = [];
let paint; // new canvas

class Bubble {
  constructor(x, y, r, colR, colG, colB) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.colR = colR;
    this.colG = colG;
    this.colB = colB;
  }

  move() {
    this.x = this.x + random(-100, 100);
    this.y = this.y + random(-100, 100);
  }

  show() {
    paint.noStroke();
    paint.fill(this.colR, this.colG, this.colB);
    paint.ellipse(this.x, this.y, this.r * 2);
  }
}
class Line {
  constructor() {
    this.startX = random(paint.width);
    this.startY = random(paint.height);
    this.endX = random(paint.width);
    this.endY = random(paint.height);
    this.isCurvy = random() < 0.5;
    this.strokeColor = color(random(255), random(255), random(255));
  }

  move() {
    this.startX = this.startX + random(-100, 100);
    this.startY = this.startY + random(-100, 100);
    this.endX = this.endX + random(-100, 100);
    this.endY = this.endY + random(-100, 100);
  }

  show() {
    paint.noFill();
    paint.stroke(this.strokeColor);
    paint.strokeWeight(random(1, 8));
    if (this.isCurvy) {
      let controlX1 = random(paint.width * 2);
      let controlY1 = random(paint.height * 2);
      let controlX2 = random(paint.width * 2);
      let controlY2 = random(paint.height * 2);
      paint.bezier(
        this.startX,
        this.startY,
        controlX1,
        controlY1,
        controlX2,
        controlY2,
        this.endX,
        this.endY
      );
    } else {
      paint.line(this.startX, this.startY, this.endX, this.endY);
    }
  }
}

let selectedAdj = "Untitled";
let selectedNoun = "";
let button;

let descriptions = [];
let randomDescription = "";
let button2;
let canvas;

function setup() {
  createCanvas(1450, 800);
  paint = createGraphics(554,382);// create new canvas
  canvas = paint.canvas;

  // button for generating painting & title
  button = createButton("GENERATE");
  button.position(1218, 348);
  button.mousePressed(updatePaint);

  // button for generating description
  button2 = createButton('SUBMIT');
  button2.position(1240, 440);
  button2.mousePressed(submitDescription);
  
//   fetchArtworkDescriptions();
  
  for (let i = 0; i < random(10, 120); i++) {
    let x = random(paint.width);
    let y = random(paint.height);
    let r = random(5, 50);
    let colR = random(255);
    let colG = random(255);
    let colB = random(255);
    let b = new Bubble(x, y, r, colR, colG, colB);
    bubbles.push(b);

    for (let j = 0; j < random(0.1, 1.2); j++) {
      let lineStartX = random(paint.width);
      let lineStartY = random(paint.height);
      let lineEndX = random(paint.width);
      let lineEndY = random(paint.height);
      let l = new Line();
      l.startX = lineStartX;
      l.startY = lineStartY;
      l.endX = lineEndX;
      l.endY = lineEndY;
      lines.push(l);
    }
  }
}

function submitDescription() {
  const inputEl = document.getElementById('description');
  console.log(inputEl.value);
  
   let obj = {
     "title" : "The " + selectedAdj + " " + selectedNoun,
     "description" : inputEl.value,
     "img" : canvas.toDataURL('image/jpeg')
   };
  
  // console.log(obj);

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route noCups
        fetch('/api/gallery', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});
}

function draw() {
  image(backgd, 0, 0, width, height);
  noStroke();
  fill(20);
  textSize(15);
  // text("Interactive media art", 1042, 408);
  // text("554mm x 382mm", 1042, 430);
  // text("2023",1042, 452);

  // random adj + noun
  strokeWeight(1);
  stroke(20);
  fill(20);
  textSize(17);
  text("The " + selectedAdj + " " + selectedNoun, 1042, 364);
  
  // draw new canvas onto main canvas
  image(paint, 233, 198);

  // Display the random description on the canvas
  strokeWeight(0);
  textSize(12);
  text(randomDescription, 1042, 520);
}

// random text drawn from arrays
function selectRandom() {
  let adj = wordData.adj;
  let noun = wordData.noun;
  selectedAdj = random(adj);
  selectedNoun = random(noun);
}

// random title + random painting
function updatePaint() {
  selectRandom();
      
  paint.background(random(255), random(255), random(255));
  
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }

  for (let j = 0; j < lines.length; j++) {
    lines[j].show();
    lines[j].move();
  }
}

// save image to data
function saveImg() {
  const imgData = canvas.toDataURL('image/jpeg');
}