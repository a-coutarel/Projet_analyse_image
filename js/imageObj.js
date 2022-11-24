export class ImageObj {
  
    image;
    canvas;
    context;
    imageData;
    data;

    red = [];
    green = [];
    blue = [];
    gray;
    imgSize;

    constructor() {
        this.image = new Image();
        this.canvas = document.getElementById('imageViewer');
        this.context = this.canvas.getContext('2d');
    }


    loadImage() {
        this.imageData = this.context.getImageData(0, 0, this.image.width, this.image.height);
        this.data = this.imageData.data;
        this.gray = [];

        let index = 0;

        for(let i = 0; i < this.data.length; i += 4) {
            this.red[index] = this.data[i];
            this.green[index] = this.data[i + 1];
            this.blue[index] = this.data[i + 2];
            index++;
        }

        this.imgSize = index;
    }


    /**
     * Draw a canvas fitting perfectly with the image ratio and print the image inside
     */
    printImage() {
        let width = parseInt(this.image.width);
        let height = parseInt(this.image.height);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.drawImage(this.image, 0,0);
        this.loadImage();
    }


    printModifiedImage() {
        let index = 0;
        for(let i = 0; i < this.data.length; i += 4) {
            this.data[i] = this.red[index];
            this.data[i + 1] = this.green[index];
            this.data[i + 2] = this.blue[index];
            index++;
        }
        this.context.putImageData(this.imageData, 0, 0);
    }


    reset() {
        this.printImage();
    }


    grayscale() {
        for(let i = 0; i < this.imgSize; i++) {
            this.gray[i] = (this.red[i] + this.green[i] + this.blue[i])/3; 
        }
        this.red = this.gray;
        this.green = this.gray;
        this.blue = this.gray;
        this.printModifiedImage();
    }


    invert() {
        for(let i = 0; i < this.imgSize; i++) {
            this.red[i] = 255 - this.red[i];
            this.green[i] = 255 - this.green[i];
            this.blue[i] = 255 - this.blue[i];
        }
        this.printModifiedImage();
    }

}
  
/*grayScaleCheck() {
    alert("The image must be grayscale before !");
}*/