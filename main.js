prediction1=""
prediction2=""
Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality: 90
})
camera=document.getElementById("camera")
Webcam.attach('#camera')
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="captureimg">'
    })
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SgtWmqB5R/model.json',modelLoaded)
function modelLoaded(){
    console.log("modelLoaded")
}
function speak(){
    synth=window.speechSynthesis
    speakdata1="The 1st Prediction Is"+prediction1
    speakdata2="The 2nd Prediction Is"+prediction2
utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2)
synth.speak(utterthis)
}
function check(){
    img=document.getElementById("captureimg");
    classifier.classify(img,gotResults)
}
function gotResults(error,results){
if(error){
    console.error(error)
}
else{
    console.log(results);
    document.getElementById("result1").innerHTML=results[0].label
    document.getElementById("result2").innerHTML=results[1].label
    prediction1=results[0].label
    prediction2=results[1].label
speak()
if (results[0].label=="Best") {
    document.getElementById("emoji1").innerHTML="&#128077;"
}
if (results[0].label=="Amazing") {
    document.getElementById("emoji1").innerHTML="&#128076;"
}
if (results[0].label=="Victory") {
    document.getElementById("emoji1").innerHTML="&#9996;"
}

if (results[1].label=="Best") {
    document.getElementById("emoji2").innerHTML="&#128077;"
}
if (results[1].label=="Amazing") {
    document.getElementById("emoji2").innerHTML="&#128076;"
}
if (results[1].label=="Victory") {
    document.getElementById("emoji2").innerHTML="&#9996;"
}
}
}
