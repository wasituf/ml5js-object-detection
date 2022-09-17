let detector
let video
let detections

function preload() {
  detector = ml5.objectDetector('cocossd')
  video = createCapture(VIDEO)
}

function setup() {
  const canvas = createCanvas(440, 640)
  canvas.parent('canvas-container')
  video.size(width, height)
  video.hide()

  detector.detect(video, gotResult)
}

function draw() {
  image(video, 0, 0)

  if (detections) {
    for (let i = 0; i < detections.length; i++) {
      let object = detections[i]
      stroke(0, 255, 0)
      strokeWeight(4)
      noFill()
      rect(object.x, object.y, object.width, object.height)
      noStroke()
      fill(0, 255, 0)
      textSize(18)
      text(
        `${object.label} ${(object.confidence * 100).toFixed(2)}%`,
        object.x + 10,
        object.y + 24,
      )
    }
  }
}

function gotResult(err, results) {
  if (err) {
    console.log(err)
  }

  detections = results
  detector.detect(video, gotResult)
}
