function drawImage(imageObj) {
    var canvas = document.getElementById('imageViewer');
    var context = canvas.getContext('2d');
    var imageWidth = imageObj.width;
    var imageHeight = imageObj.height;

    scaleToFit(imageObj);

    /*var imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight); // get image array
    var data = imageData.data;

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
    } 

    var imageData = context.getImageData(0, 0, imageWidth, imageHeight);
    var data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }
    context.putImageData(imageData, 0, 0);*/

  }
  
  var imageObj = new Image();
  imageObj.crossOrigin = "anonymous";
  imageObj.src = './darth-vader.jpg';
  
imageObj.onload = function() {
    drawImage(this);
};
  
var x=0;
    var y=0;

  function scaleToFit(img){
    var canvas = document.getElementById('imageViewer');
    var context = canvas.getContext('2d');

    var ratio = img.height / img.width;
    canvas.height = canvas.width * ratio;
    
    context.drawImage(img, 0,0, canvas.width, canvas.height);

    var key,pos=0;
    document.onkeydown=function(e)
    {
      pos=1;
      key=window.event?e.keyCode:e.which;
    }
    document.onkeyup=function(e){pos=0;}
    setInterval(function()
    {
      var canvas = document.getElementById('imageViewer');
      var context = canvas.getContext('2d');
      if(pos==0)return;
      if(key==37)x-=2;
      if(key==38)y-=2;
      if(key==39)x+=2;
      if(key==40)y+=2;
      canvas.width=canvas.width;
      context.drawImage(img, x,y, canvas.width, canvas.height);
    },5);
  }


document.querySelector('#zoom-in').addEventListener("click", () => {
    var el = document.querySelector('#imageViewer');
    var width = el.clientWidth;
    el.style.width = width + 100 + "px";
});

document.querySelector('#zoom-out').addEventListener("click", () => {
    var el = document.querySelector('#imageViewer');
    var width = el.clientWidth;
    el.style.width = width - 100 + "px";
});

document.querySelector('#rescale').addEventListener("click", () => {
  var canvas = document.getElementById('imageViewer');
  var context = canvas.getContext('2d');
  var ratio = imageObj.height / imageObj.width;
    canvas.height = canvas.width * ratio;
    x = 0;
    y = 0;
    context.drawImage(imageObj, 0,0, canvas.width, canvas.height);
});