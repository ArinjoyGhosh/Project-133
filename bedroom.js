status = "";
cpercent = 0;
label = "";
x = 0;
y = 0;
width = 0;
height = 0;
objects = [];


function goBack() {
    window.location.href = "index.html";
}
function preload() {
    img = loadImage('bed2.jpg');
    console.log("BG Loaded")
}
function setup() {
    canvas = createCanvas(1000, 1000);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function draw() {
    image(img, 0, 0, 1000, 1000);
    if (status != "") {
        for(i = 0; i < length; i++) {
            cpercent = Number(objects[i].confidence) * 100;
            label = objects[i].label;
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width ;
            height = objects[i].height ;
            console.log(x, y, width, height, label, cpercent);
            fill("#FF0000");
            text(label, x, y);
            text(cpercent, x, y+10);
            noFill();
            stroke("#FF0000");
            rect (x, y, width, height);
            document.getElementById("status").innerHTML = "Objects Detected: " + length;
        }    
    }
}
function modelLoaded() {
    status = "true";
    console.log("Model Loaded!");
    objectDetector.detect(img, gotResults);
}
function gotResults(error, results) {
    if (error)
        console.log(error);
    else {
        console.log(results);
        objects = results;
        length = results.length;
    }
}
