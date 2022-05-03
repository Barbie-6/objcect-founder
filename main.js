status = "";
objects = [];
object_name = '';
function preload(){

}
function setup(){
canvas = createCanvas(400, 300);
canvas.center();
video = createCapture(VIDEO);
video.hide();
}
function draw(){
image(video, 0, 0, 400, 300);
if(status != ""){
    objectDetector.detect(video, gotResults);
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "Objects Detected";
        stroke("red");
        noFill();
        strokeWeight(2);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        text(objects[i].label, objects[i].x + 15, objects[i].y + 15 );
        if(objects[i].label == object_name){
            document.getElementById("object_found").innerHTML = objects[i].label + " found!";
            video.stop();
            objectDetector.detect(gotResults);
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + " found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("object_found").innerHTML = objects[i].label + " Not found!";
        }
    }
}
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
    object_name = document.getElementById("object_name").value;
}
function modelLoaded(){
    console.log("Model is loaded");
    status = true;
}
function gotResults(error, results){

    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}