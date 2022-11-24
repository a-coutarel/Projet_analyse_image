import { ImageObj } from "./imageObj.js";

let imageObj = new ImageObj();

/**
 * Increases the size of the canvas
 */
document.querySelector('#zoom-in').addEventListener("click", () => {
    let width = imageObj.canvas.clientWidth;
    imageObj.canvas.style.width = width + 80 + "px";
});


/**
 * decreases the size of the canvas
 */
document.querySelector('#zoom-out').addEventListener("click", () => {
    let width = imageObj.canvas.clientWidth;
    imageObj.canvas.style.width = width - 80 + "px";
});


/**
 * Replaces the canvas at the center of the screen
 */
document.querySelector('#center').addEventListener("click", () => {
  imageObj.canvas.style.top = "50%";
  imageObj.canvas.style.left = "50%";
});


/**
 * Moves the canvas with keyboard controls
 */
document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp') {
    imageObj.canvas.style.top = `${imageObj.canvas.offsetTop - 80}px`;
  }

  if (event.code === 'ArrowDown') {
    imageObj.canvas.style.top = `${imageObj.canvas.offsetTop + 80}px`;
  }

  if (event.code === 'ArrowLeft') {
    imageObj.canvas.style.left = `${imageObj.canvas.offsetLeft - 80}px`;
  }

  if (event.code === 'ArrowRight') {
    imageObj.canvas.style.left = `${imageObj.canvas.offsetLeft + 80}px`;
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
  let files = document.getElementById("getFile").files;
  let fr = new FileReader();
  fr.onload = function () { imageObj.image.src = fr.result; }
  fr.readAsDataURL(files[0]);
  
  imageObj.image.crossOrigin = "anonymous";
  imageObj.image.onload = function() { imageObj.printImage(); };
  document.getElementById('getFile').value = null;
});


/**
 * Restores the original image
 */
 document.querySelector('#reset').addEventListener("click", () => {
  imageObj.reset();
});


/**
 * Local download of the image
 */
 document.querySelector('#save').addEventListener("click", () => {
  const link = document.createElement('a');
  link.download = 'download.jpeg';
  link.href = imageObj.canvas.toDataURL();
  link.click();
  link.delete;
});


/**
 * Addition of the image and another one
 */
 document.querySelector('#addition').addEventListener("click", () => {
  
});


/**
 * Substraction of the image and another one
 */
 document.querySelector('#substraction').addEventListener("click", () => {
  
});


/**
 * Grayscale
 */
 document.querySelector('#grayscale').addEventListener("click", () => {
  imageObj.grayscale();
});


/**
 * Binarises the image
 */
 document.querySelector('#binarise').addEventListener("click", () => {
  
});


/**
 * Inverts the image
 */
document.querySelector('#invert').addEventListener("click", () => {
  imageObj.invert();
});