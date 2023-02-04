status = "";
objects = [];
song = "";
function setup() {
  canvas = createCanvas(580, 580);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(580, 580);
  video.hide();
}

function preload(){
    song = loadSound("ringing_old_phone.mp3")
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results){
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function draw() {
  image(video, 0, 0, 580, 580);
  if(status != "")
  {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

      fill(r,g,b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if(objects[i].label == "person")
      {
        document.getElementById("status").innerHTML="Baby Detected";
        song.stop();
      }

      else{
        document.getElementById("status").innerHTML="Baby Not Detected";
        song.play();
      }
    }
  }
}