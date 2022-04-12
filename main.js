song1="";
song2="";
song1_status="";
song2_status=""
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("POKEMON!.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        leftWristy=results[0].pose.leftWrist.y;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        
    }
}
function modelLoaded(){
    console.log("poseNet Initalized");
}
function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("aqua");
    stroke("blue");
    if(scoreLeftWrist>0.2){
        circle(leftWristx,leftWristy,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="Playing the Pokemon theme song"
        }
    }
    if(scoreRightWrist>0.2){
        circle(rightWristx,rightWristy,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="Playing a Harry Potter Remix"
        }
    }
}
function play(){
    song.play();
    song.setVolume(0.1);
    song.rate(1);
}