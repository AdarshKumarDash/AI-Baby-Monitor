status = "";
object = [];

function preload() {
    alarm = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(640, 460);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelloaded() {
    console.log("Model Loaded");
    status = true;
}

function getResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        object = result;
    }
}

function draw() {
    image(video, 0, 0, 640, 460);
    r = random(255);
    g = random(255);
    b = random(255);
    if (status != "") {
        objectDetector.detect(video, getResult);
        for (i = 0; i < object.length; i++) {
            strokeWeight(1);
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 22);
            textSize(25);
            noFill();
            stroke(r, g, b);
            strokeWeight(3);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            document.getElementById("status").innerHTML = "Object Detected";
            if (object[i].label == "person") {
                document.getElementById("babysts").innerHTML = "Baby Found";
                alarm.stop();
            } else {
                document.getElementById("babysts").innerHTML = "Baby Not Found";
                alarm.play();
            }
        }
        if (object.length == 0) {
            document.getElementById("babysts").innerHTML = "Baby Not Found";
            alarm.play();
        }
    }
}