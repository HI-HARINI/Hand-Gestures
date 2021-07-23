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
synth.speak(utterThis)
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
}
}