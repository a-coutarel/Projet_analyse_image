import { ImageObj } from "./ImageObj.js";
import { Invert } from "./image_processing/invert.js";
import { Grayscale } from "./image_processing/grayscale.js";
import { Erosion } from "./image_processing/erosion.js";
import { Dilatation } from "./image_processing/dilatation.js";
import { Binarise } from "./image_processing/binarise.js";
import { Close } from "./image_processing/close.js";
import { Open } from "./image_processing/open.js";

let canvas = document.getElementById('imageViewer');

let imageObj;

/**
 * Increases the size of the canvas
 */
document.querySelector('#zoom-in').addEventListener("click", () => {
    let width = canvas.clientWidth
    canvas.style.width = Math.floor(width*1.1) + "px";
});


/**
 * decreases the size of the canvas
 */
document.querySelector('#zoom-out').addEventListener("click", () => {
    let width = canvas.clientWidth;
    canvas.style.width = Math.floor(width/1.1) + "px";
});


/**
 * Replaces the canvas at the center of the screen
 */
document.querySelector('#center').addEventListener("click", () => {
  canvas.style.top = "50%";
  canvas.style.left = "50%";
});


/**
 * Moves the canvas with keyboard controls
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
  
  if (event.code === 'KeyW' && event.ctrlKey) {
    console.log(imageObj.old_image);
    console.log("CTRL Z");
    
    if (imageObj.old_image.length >= 1) {
      imageObj = new ImageObj(imageObj.old_image.at(-1));
      imageObj.old_image.pop();
      imageObj.print();
    }
    console.log(imageObj.old_image);
  }
});



/**
 * Connects the input #getFile to the button #openFile
 */
document.querySelector('#openFile').addEventListener("click", () => {
  document.getElementById('getFile').click();
});


/**
 * When an image is chosen, imports it and prints it
 */
document.querySelector('#getFile').addEventListener("change", () => {
  canvas.style.visibility = "visible";
  imageObj = new ImageObj();
  let files = document.getElementById("getFile").files;
  let fr = new FileReader();
  fr.onload = function () { imageObj.image.src = fr.result; }
  fr.readAsDataURL(files[0]);
  
  imageObj.image.crossOrigin = "anonymous";
  imageObj.image.onload = function() { imageObj.loadImage(); };
  document.getElementById('getFile').value = null;
});


/**
 * Restores the original image
 */
 document.querySelector('#reset').addEventListener("click", () => {
  if(imageObj instanceof ImageObj) {
    let img = imageObj.image;
    imageObj = new ImageObj();
    imageObj.reset(img);
  }
});


/**
 * Local download of the image
 */
 document.querySelector('#save').addEventListener("click", () => {
  if(imageObj instanceof ImageObj) {
    const link = document.createElement('a');
    link.download = 'download.jpeg';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  }
});


/**
 * Addition button action
 */
 document.querySelector('#addition').addEventListener("click", () => {
  
});


/**
 * Substraction button action
 */
 document.querySelector('#substraction').addEventListener("click", () => {
  
});


/**
 * Invert button action
 */
 document.querySelector('#invert').addEventListener("click", () => {
  new Invert(imageObj).outRGBProcessing();
});


/**
 * Grayscale button action
 */
 document.querySelector('#grayscale').addEventListener("click", () => {
  new Grayscale(imageObj).outRGBProcessing();
});


/**
 * Binarise button action
 */
 document.querySelector('#binarise').addEventListener("click", () => {
  new Binarise(imageObj).outGrayscaleProcessing();
});


/**
 * Treshold button action
 */
 document.querySelector('#treshold').addEventListener("click", () => {
  
});


/**
 * Erosion button action
 */
 document.querySelector('#erosion').addEventListener("click", () => {
  new Erosion(imageObj).outBinaryProcessing();
});


/**
 * Dilatation button action
 */
 document.querySelector('#dilatation').addEventListener("click", () => {
  new Dilatation(imageObj).outBinaryProcessing();
});


/**
 * Open button action
 */
 document.querySelector('#open').addEventListener("click", () => {
  new Open(imageObj).outBinaryProcessing();
});


/**
 * Close button action
 */
 document.querySelector('#close').addEventListener("click", () => {
  new Close(imageObj).outBinaryProcessing();
});


/**
 * Thinning button action
 */
 document.querySelector('#thinning').addEventListener("click", () => {
  
});


/**
 * Thickening button action
 */
 document.querySelector('#thickening').addEventListener("click", () => {
  
});


/**
 * Skeleton-lantuejoul button action
 */
 document.querySelector('#skeleton-lantuejoul').addEventListener("click", () => {
  
});


/**
 * Skeleton-homotopic-thinning button action
 */
 document.querySelector('#skeleton-homotopic-thinning').addEventListener("click", () => {
  
});