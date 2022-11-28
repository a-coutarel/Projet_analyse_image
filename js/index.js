import { ImageObj } from "./ImageObj.js";
import { Invert } from "./image_processing/invert.js";
import { Grayscale } from "./image_processing/grayscale.js";
import { Erosion } from "./image_processing/erosion.js";
import { Dilatation } from "./image_processing/dilatation.js";
import { Binarise } from "./image_processing/binarise.js";
import { Close } from "./image_processing/close.js";
import { Open } from "./image_processing/open.js";
import { Addition } from "./image_processing/addition.js";
import { Substraction } from "./image_processing/substraction.js";
import { Threshold } from "./image_processing/threshold.js";

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
  if (event.code === 'ArrowDown') {
    canvas.style.top = `${canvas.offsetTop - 80}px`;
  }

  if (event.code === 'ArrowUp') {
    canvas.style.top = `${canvas.offsetTop + 80}px`;
  }

  if (event.code === 'ArrowRight') {
    canvas.style.left = `${canvas.offsetLeft - 80}px`;
  }

  if (event.code === 'ArrowLeft') {
    canvas.style.left = `${canvas.offsetLeft + 80}px`;
  }
  
  if (event.code === 'KeyW' && event.ctrlKey) {
    if (imageObj != undefined && imageObj.prev_image != undefined) {
      imageObj = imageObj.prev_image;
      imageObj.print();
    }
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
  canvas.style.setProperty('width', 'calc(30% + 300px)');
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
 * Delete the image instance and hide the canvas
 */
 document.querySelector('#clear').addEventListener("click", () => {
  if(imageObj instanceof ImageObj) {
    imageObj = undefined;
    canvas.style.visibility = "hidden";
    canvas.style.setProperty('width', 'calc(30% + 300px)');
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }
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
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  }
});


/**
 * Addition button action
 */
 document.querySelector('#addition').addEventListener("click", () => {
  if(imageObj != undefined)
    document.getElementById('getFileAddition').click();
  else
    alert("Please open a file first.")
});


document.querySelector('#getFileAddition').addEventListener("change", () => {
  let second_imageObj = new ImageObj();
  let files = document.getElementById("getFileAddition").files;
  let fr = new FileReader();
  fr.onload = function () { second_imageObj.image.src = fr.result; }
  fr.readAsDataURL(files[0]);
  
  second_imageObj.image.onload = function() { new Addition(imageObj, second_imageObj).outRGBProcessing(); };
  document.getElementById('getFileAddition').value = null;
});


/**
 * Substraction button action
 */
 document.querySelector('#substraction').addEventListener("click", () => {
  if(imageObj != undefined)
    document.getElementById('getFileSubstraction').click();
  else
    alert("Please open a file first.")
});


document.querySelector('#getFileSubstraction').addEventListener("change", () => {
  let second_imageObj = new ImageObj();
  let files = document.getElementById("getFileSubstraction").files;
  let fr = new FileReader();
  fr.onload = function () { second_imageObj.image.src = fr.result; }
  fr.readAsDataURL(files[0]);
  
  second_imageObj.image.onload = function() { new Substraction(imageObj, second_imageObj).outRGBProcessing(); };
  document.getElementById('getFileSubstraction').value = null;
});


/**
 * Invert button action
 */
 document.querySelector('#invert').addEventListener("click", () => {
  new Invert(imageObj).outRGBProcessing();
});


/**
 * Treshold button action
 */
 document.querySelector('#treshold').addEventListener("click", () => {
  new Threshold(imageObj).outRGBProcessing();
});


/**
 * Grayscale button action
 */
 document.querySelector('#grayscale').addEventListener("click", () => {
  //images.push(new ImageObj(imageObj));
  new Grayscale(imageObj).outRGBProcessing();
});


/**
 * Binarise button action
 */
 document.querySelector('#binarise').addEventListener("click", () => {
  new Binarise(imageObj).outGrayscaleProcessing();
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