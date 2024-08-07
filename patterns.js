let angle = 0;
let rotationSpeed = 0.01;
let shape = 'ellipse';
let colorModeType = 'HSB';

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('patternsCanvas');
    colorMode(HSB);
    noFill();
    strokeWeight(2);

    // Control elements
    let shapeSelect = select('#shapeSelect');
    shapeSelect.changed(() => shape = shapeSelect.value());

    let colorModeSelect = select('#colorModeSelect');
    colorModeSelect.changed(() => {
        colorModeType = colorModeSelect.value();
        colorMode(colorModeType === 'HSB' ? HSB : RGB);
    });

    let rotationSpeedSlider = select('#rotationSpeed');
    rotationSpeedSlider.input(() => rotationSpeed = rotationSpeedSlider.value());
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    for (let i = 0; i < 10; i++) {
        push();
        rotate(angle + TWO_PI * i / 10);
        drawPattern(0, 0, width / 4);
        pop();
    }

    angle += rotationSpeed;
}

function drawPattern(x, y, size) {
    stroke((frameCount + x + y) % 255, 255, 255);
    switch (shape) {
        case 'ellipse':
            ellipse(x, y, size);
            ellipse(x, y, size / 2);
            ellipse(x, y, size / 4);
            break;
        case 'rectangle':
            rectMode(CENTER);
            rect(x, y, size, size);
            rect(x, y, size / 2, size / 2);
            rect(x, y, size / 4, size / 4);
            break;
        case 'triangle':
            triangle(x - size / 2, y + size / 2, x, y - size / 2, x + size / 2, y + size / 2);
            triangle(x - size / 4, y + size / 4, x, y - size / 4, x + size / 4, y + size / 4);
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
