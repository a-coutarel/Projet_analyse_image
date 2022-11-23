var image = new Image();
var canvas = document.getElementById('imageViewer');
var context = canvas.getContext('2d');


/**
 * Increase the size of the canvas
 */
document.querySelector('#zoom-in').addEventListener("click", () => {
    var width = canvas.clientWidth;
    canvas.style.width = width + 80 + "px";
});


/**
 * decrease the size of the canvas
 */
document.querySelector('#zoom-out').addEventListener("click", () => {
    var width = canvas.clientWidth;
    canvas.style.width = width - 80 + "px";
});


/**
 * Replace the canvas at the center of the screen
 */
document.querySelector('#center').addEventListener("click", () => {
  canvas.style.top = "50%";
  canvas.style.left = "50%";
});


/**
 * Move the canvas with keyboard controls
 */
document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp') {
    canvas.style.top = `${canvas.offsetTop - 80}px`;
  }

  if (event.code === 'ArrowDown') {
    canvas.style.top = `${canvas.offsetTop + 80}px`;
  }

  if (event.code === 'ArrowLeft') {
    canvas.style.left = `${canvas.offsetLeft - 80}px`;
  }

  if (event.code === 'ArrowRight') {
    canvas.style.left = `${canvas.offsetLeft + 80}px`;
  }
});


/**
 * Restore the original image
 */
document.querySelector('#reset').addEventListener("click", () => {
  drawImage();
});


/**
 * Local download of the image
 */
document.querySelector('#save').addEventListener("click", () => {
  const link = document.createElement('a');
  link.download = 'download.jpeg';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});


/**
 * Connect the input getFile to the button openFile
 */
document.querySelector('#openFile').addEventListener("click", () => {
  document.getElementById('getFile').click();
});


/**
 * When an image is chosen, open it
 */
document.querySelector('#getFile').addEventListener("change", () => {
  var files = document.getElementById("getFile").files;
  var fr = new FileReader();
  fr.onload = function () { image.src = fr.result; }
  fr.readAsDataURL(files[0]);
  
  image.crossOrigin = "anonymous";
  image.onload = function() { drawImage(); };
  document.getElementById('getFile').value = null;
});


/**
 * Draw a canvas fitting perfectly with the image ratio and print the image inside
 */
 function drawImage() {
  var width = parseInt(image.width);
  var height = parseInt(image.height);
  canvas.height=height;
  canvas.width=width;
  context.drawImage(image, 0,0);
}





function grayScaleCheck() {
  alert("The image must be grayscale before !");
}

document.querySelector('#invert').addEventListener("click", () => {
  test();
});

function test() {
  var imageWidth = image.width;
  var imageHeight = image.height;
/*  
  // iterate over all pixels
  for(var i = 0, n = data.length; i < n; i += 4) {
    var red = data[i];
    var green = data[i + 1];
    var blue = data[i + 2];
    var alpha = data[i + 3];
  }
  // pick out pixel data from x, y coordinate
  var x = 20;
  var y = 20;
  var red = data[((imageWidth * y) + x) * 4];
  var green = data[((imageWidth * y) + x) * 4 + 1];
  var blue = data[((imageWidth * y) + x) * 4 + 2];
  var alpha = data[((imageWidth * y) + x) * 4 + 3];
  
  // iterate over all pixels based on x and y coordinates
  for(var y = 0; y < imageHeight; y++) {
    // loop through each column
    for(var x = 0; x < imageWidth; x++) {
      var red = data[((imageWidth * y) + x) * 4];
      var green = data[((imageWidth * y) + x) * 4 + 1];
      var blue = data[((imageWidth * y) + x) * 4 + 2];
      var alpha = data[((imageWidth * y) + x) * 4 + 3];
    }
  } */

  //inversion
  var imageData = context.getImageData(0, 0, imageWidth, imageHeight);
  var data = imageData.data;

  var red = [];
  var green = [];
  var blue = [];
  var index = 0;
  for(var i = 0; i < data.length; i += 4) {
    red[index] = data[i];
    green[index] = data[i + 1];
    blue[index] = data[i + 2];
    index++;
  }
  
  for(var i = 0; i < red.length; i++) {
    red[i] = 255 - red[i];
    green[i] = 255 - green[i];
    blue[i] = 255 - blue[i];
  }

  index = 0;
  for(var i = 0; i < data.length; i += 4) {
    data[i] = red[index];
    data[i + 1] = green[index];
    data[i + 2] = blue[index];
    index++;
  }

  context.putImageData(imageData, 0, 0);
}