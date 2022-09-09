prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function EmojiTake(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'>";
    })
}

console.log("ml5version", ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/rI2QAYAFH/model.json", model_loaded);

function model_loaded(){
    console.log("model loaded done bye");
}

function speak(){
    var synthesis=window.speechSynthesis;
    speak_data1="First Prediction: "+prediction1;
    speak_data2="Second Prediction: "+prediction2;

    var utter=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synthesis.speak(utter);
}

function Identify(){
    img=document.getElementById("captured_img");
    classifier.classify(img, got_result);
}

function got_result(error, result){
    if (error){
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;

        prediction1=result[0].label;
        prediction2=result[1].label;

        speak()

        if (result[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128512;";
        }
        if (result[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#128546;";
        }
        if (result[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }

        if (result[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }
        if (result[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128546;";
        }
        if (result[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;";
        }
    }
}

