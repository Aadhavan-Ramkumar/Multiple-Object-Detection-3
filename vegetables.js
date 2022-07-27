var Vegetables = ""
var Status = ""
var Objects = []

function preload() {
    Vegetables = loadImage("Vegetables.jpeg")
}

function setup() {
    Canvas = createCanvas(500, 375)
    Canvas.position(400, 175)
    ObjectDetector = ml5.objectDetector("cocossd", ModelLoaded)
    document.getElementById("Status").innerHTML = "Status: Detecting Objects"
}

function draw() {
    image(Vegetables, 0, 0, 500, 375)
    if (Status != "") {
        for (let i = 0; i < Objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status: Objects Detected"
            fill("#FF0000")
            Percent = floor(Objects[i].confidence * 100)
            text(Objects[i].label.toUpperCase() + " " + Percent + "%", Objects[i].x + 15, Objects[i].y + 15)
            noFill()
            stroke("#FF0000")
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height)
        }
    }
}

function ModelLoaded() {
    console.log("Model Loaded!")
    Status = true
    ObjectDetector.detect(Vegetables, GetResults)
}

function GetResults(Error, Results) {
    if (Error) {
        console.error(Error)
    }
    console.log(Results)
    Objects = Results
}