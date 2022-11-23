var imageObj = new Image();
imageObj.crossOrigin = "anonymous";
imageObj.src = './darth-vader.jpg';
imageObj.onload = function() { drawImage(this); };

var canvas = document.getElementById('imageViewer');
var context = canvas.getContext('2d');

/**
 * Draw a canvas fitting perfectly with the image ratio and print the image inside
 */
function drawImage(img) {
  var ratio = img.height / img.width;
  canvas.height = canvas.width * ratio;
  context.drawImage(img, 0,0, canvas.width, canvas.height);
}


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

