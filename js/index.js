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
import { Lantuejoul } from "./image_processing/lantuejoul.js";
import { Thinning } from "./image_processing/thinning.js";
import { Thickening } from "./image_processing/thickening.js";
import { HomotopicThickening } from "./image_processing/homotopic_thinning.js";


let canvas = document.getElementById('imageViewer');

let imageObj;


const histogram = document.getElementById('histogram');

let chartHisto = new Chart(histogram, {
    type: 'bar',
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Intensity'
          },
        },
        y: {
          title: {
            display: true,
            text: 'Number of pixels'
          },
          beginAtZero: true,
        }
      }
    }
  });



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
  imageObj.setChart(chartHisto);
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
  document.getElementById('close-histo').click();
  document.getElementById('center').click();
  document.querySelector('#histo-container').style.left = 73.5 + "vw";
  document.querySelector('#histo-container').style.top = 71.35 + "vh";
});


/**
 * Restores the original image
 */
 document.querySelector('#reset').addEventListener("click", () => {
  if(imageObj instanceof ImageObj) {
    let img = imageObj.image;
    imageObj = new ImageObj();
    imageObj.setChart(chartHisto);
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
  new Thinning(imageObj).outBinaryProcessing();
});


/**
 * Thickening button action
 */
 document.querySelector('#thickening').addEventListener("click", () => {
  new Thickening(imageObj).outBinaryProcessing();
});


/**
 * Skeleton-homotopic-thinning button action
 */
 document.querySelector('#skeleton-homotopic-thinning').addEventListener("click", () => {
  new HomotopicThickening(imageObj).outBinaryProcessing();
});


/**
 * Skeleton-lantuejoul button action
 */
 document.querySelector('#skeleton-lantuejoul').addEventListener("click", () => {
  new Lantuejoul(imageObj).outBinaryProcessing();
});



/**
 * Shows picture of details of the structuring element for thinning when click on the thinning info btn
 */
document.querySelector('.thinning-btninfo').addEventListener("click", () => {
  let img = document.getElementsByClassName("SE-details")[0];
  if(img.style.height == '0px' || img.style.height == '') {
    img.style.opacity = "1";
    img.style.height = 'auto';
    document.querySelector('.thinning-btninfo').innerText = "ⓧ"; 
  }
  else { 
    img.style.opacity = "0";
    setTimeout( () => { img.style.height = '0px' }, 150);
    document.querySelector('.thinning-btninfo').innerText = "ⓘ"; 
  }
});

/**
 * Shows picture of details of the structuring element for thickening when click on the thickening info btn
 */
document.querySelector('.thickening-btninfo').addEventListener("click", () => {
  let img = document.getElementsByClassName("SE-details")[1];
  if(img.style.height == '0px' || img.style.height == '') {
    img.style.opacity = "1";
    img.style.height = 'auto';
    document.querySelector('.thickening-btninfo').innerText = "ⓧ"; 
  }
  else { 
    img.style.opacity = "0";
    setTimeout( () => { img.style.height = '0px' }, 150);
    document.querySelector('.thickening-btninfo').innerText = "ⓘ"; 
  }
});



/**
 * Shows the histogram window
 */
document.querySelector('#show-histo').addEventListener("click", () => {
  if(imageObj instanceof ImageObj) {
    histogram.style.visibility = "visible";
    histogram.style.opacity = "1";
  }
  else {
    document.querySelector('#histo-alert').style.visibility = "visible";
    document.querySelector('#histo-alert').style.opacity = "1";
  }

  document.querySelector('#show-histo').style.visibility = "hidden";
  document.querySelector('#close-histo').style.visibility = "visible";
  document.querySelector('#histo-container').style.visibility = "visible";

  document.querySelector('#show-histo').style.opacity = "0";
  document.querySelector('#close-histo').style.opacity = "1";
  document.querySelector('#histo-container').style.background = "linear-gradient(to right, #FDFBFB, #EBEDEE 70%)";
});


/**
 * Closes the histogram window
 */
document.querySelector('#close-histo').addEventListener("click", () => {
  histogram.style.visibility = "hidden";
  histogram.style.opacity = "0";
  document.querySelector('#histo-alert').style.visibility = "hidden";
  document.querySelector('#histo-alert').style.opacity = "0";
  
  document.querySelector('#show-histo').style.visibility = "visible";
  document.querySelector('#close-histo').style.visibility = "hidden";
  document.querySelector('#histo-container').style.visibility = "hidden";

  document.querySelector('#show-histo').style.opacity = "1";
  document.querySelector('#close-histo').style.opacity = "0";
  document.querySelector('#histo-container').style.background = "transparent";
});


let mousePositionHisto;
let offsetHisto = [0,0];
let isDownHisto = false;

document.querySelector('#histo-container').addEventListener('mousedown', function(e) {
  isDownHisto = true;
  offsetHisto = [
      document.querySelector('#histo-container').offsetLeft - e.clientX,
      document.querySelector('#histo-container').offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDownHisto) {
      mousePositionHisto = {
    
            x : event.clientX,
            y : event.clientY
    
        };
        document.querySelector('#histo-container').style.left = (mousePositionHisto.x + offsetHisto[0]) + 'px';
        document.querySelector('#histo-container').style.top  = (mousePositionHisto.y + offsetHisto[1]) + 'px';
    }
}, true);


document.addEventListener('mouseup', function() {
  isDownHisto = false;
  isDownCanvas = false;
}, true);


let mousePositionCanvas;
let offsetCanvas = [0,0];
let isDownCanvas = false;

canvas.addEventListener('mousedown', function(e) {
  isDownCanvas = true;
  offsetCanvas = [
    canvas.offsetLeft - e.clientX,
    canvas.offsetTop - e.clientY
  ];
}, true);

document.addEventListener('mousemove', function(event) {
  event.preventDefault();
  if (isDownCanvas) {
    mousePositionCanvas = {
  
          x : event.clientX,
          y : event.clientY
  
      };

      canvas.style.left = (mousePositionCanvas.x + offsetCanvas[0]) + 'px';
      canvas.style.top  = (mousePositionCanvas.y + offsetCanvas[1]) + 'px';
  }
}, true);