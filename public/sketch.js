// Open and connect socket
let socket = io();
let hue;

socket.on('connect', function() {
  console.log("Connected");
});
let clientId = create_UUID();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  hue = getRandomInt(100)
  colorMode(HSB, 100)
  noFill();
  // Receive message from server
  socket.on('data', drawPos);
}

function draw() {
  noStroke();
  textSize(32);
  fill(0,0,0)
  text('Click to draw a circle, each player gets to use a random specific color', 10, 30);
  
}

function mousePressed() {
  // Send mouse position
  socket.emit('data', {x: mouseX, y: mouseY, hue: hue, clinetId: clientId});
}


function drawPos(pos) {
  noFill();
  strokeWeight(5);
  stroke(pos.hue, 100, 100);
  circle(pos.x, pos.y, 200, 200);
}

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}