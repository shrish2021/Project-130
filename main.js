song1 = "";
song2 = "";
lst = "";
rst = "";
lsc = 0;
rsc = 0;
xl = 0;
yl = 0;
xr = 0;
yr = 0;

function preload() 
{   song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Model Loaded!");
}

function gotPoses(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        if(results.length > 0)
        {
            rsc = results[0].pose.keypoints[10].score;
            lsc = results[0].pose.keypoints[9].score;

            xl = results[0].pose.leftWrist.x;
            yl = results[0].pose.leftWrist.y;

            xr = results[0].pose.leftWrist.x;
            yr = results[0].pose.leftWrist.y;
        }
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);
    stroke("#FF0000");
    fill("#FF0000");

    lst = song1.isPlaying();
    rst = song2.isPlaying();

    if(lsc > 0.2)
    {
        circle(xl, yl, 20);
        song2.stop(); 
        if(lst == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Status: Harry Potter";
        }  
    }
    if(rsc > 0.2)
    {
        circle(xr, yr, 20);
        song1.stop();
        if(lst == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Status: Peter Pan";
        }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}