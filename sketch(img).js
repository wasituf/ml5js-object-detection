let detector
let img

function preload() {
  img = loadImage('images/cat.jpg')
  detector = ml5.objectDetector('cocossd')
}

function setup() {
  createCanvas(640, 480)
  image(img, 0, 0)
  detector.detect(img, gotResult)
}

function gotResult(err, results) {
  if (err) {
    console.log(err)
  }

  for (let i = 0; i < results.length; i++) {
    let object = results[i]
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
