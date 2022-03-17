find_status="";
object=[]

function setup(){
    canavs=createCanvas(380,380)
    canavs.center()
    video=createCapture(VIDEO);
    video.hide()
    object_Detection=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status:  Detecting Object"
}
function modelLoaded(){
    console.log("Model Loaded");
    find_status=true;
    object_Detection.detect(video,gotResults)
}
function draw(){
    r=random(255);
    g=random(255);
    b=random(255);
    image(video,0,0,380,380)
    if(find_status!=""){
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status:  Detected Object(s)"
            document.getElementById("object").innerHTML="Number of objects detected:- "+object.length;
            fill(r,g,b)
            percent=floor(object[i].confidence*100)
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y)
            textSize(22)
            noFill()
            stroke(r,g,b)
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
        }
    }
}
function gotResults(error,results){
if(error){
    console.log(error);
}
console.log(results);
object=results
}