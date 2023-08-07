/* https://teachablemachine.withgoogle.com/models/t6mqWjLa2/ */

Webcam.set ({
    width: 300,
    height:350,
    image_format: 'png',
    png_quality:90
    });

    Camera = document.getElementById("camera");
    Webcam.attach("#camera");

    function take_snapshot(){
    Webcam.snap(function (data_uri) {
document.getElementById("result").innerHTML = "<img id='captured_img' src= " + data_uri + ">"
        });
    }

    console.log("ml5 version", ml5.version);
    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/t6mqWjLa2/model.json", ModelLoaded);

    function ModelLoaded(){
        console.log("Model Loaded")
    }

    function Check() {
        img = document.getElementById("captured_img");
        classifier.classify(img, gotresult);
        console.log("Check");
        }
        result_emotion_name = ""
        result_emotion_name2 = ""
        
        
        function gotresult(error, result){
        if (error) {
         console.error(error);  
        }
        else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        
        result_emotion_name = result[0].label;
        result_emotion_name2 = result[1].label;
        speak();
        if (result[0].label == "Thumbs up") {
            document.getElementById("update_emoji").innerHTML = "&#128512;"
        }
        if (result[0].label == "Peace sign") {
            document.getElementById("update_emoji").innerHTML = "&#128532;"
        }
        if (result[0].label == "Perfect sign") {
            document.getElementById("update_emoji").innerHTML = "&#128546;"
        }
        
        if (result[1].label == "Thumbs up") {
            document.getElementById("update_emoji2").innerHTML = "&#128512;"
        }
        if (result[1].label == "Peace sign") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;"
        }
        if (result[1].label == "Perfect sign") {
            document.getElementById("update_emoji2").innerHTML = "&#128546;"
        }
        
        }
        
        }

        
function speak(){
    var synth = window.speechSynthesis;
    speakdata1 = "The first prediction is" + result_emotion_name;
    speakdata2 = "The prediction is" + result_emotion_name2;
    var utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
synth.speak(utterThis);
}