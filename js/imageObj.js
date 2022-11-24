export class ImageObj {
  
    image;
    canvas;
    context;
    imageData;
    data;

    red = [];
    green = [];
    blue = [];
    gray = [];
    imgSize;
    imgWidth;
    imgHeight;
    isGrayscale;

    constructor() {
        this.image = new Image();
        this.canvas = document.getElementById('imageViewer');
        this.context = this.canvas.getContext('2d');
        this.isGrayscale = false;
    }


    loadImage() {
        this.imageData = this.context.getImageData(0, 0, this.image.width, this.image.height);
        this.data = this.imageData.data;

        let index = 0;

        for(let i = 0; i < this.data.length; i += 4) {
            this.red[index] = this.data[i];
            this.green[index] = this.data[i + 1];
            this.blue[index] = this.data[i + 2];
            index++;
        }

        this.imgSize = index;
        this.imgWidth = this.image.width;
        this.imgHeight = this.image.height;
        
        this.isImageGrayscale();
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


    reset(img) {
        this.image = img;
        this.printImage();
    }


    grayscaleCheck() {
        if(!this.isGrayscale) {
            alert("The image must be converted to grayscale first.\nPlease use the grayscale function.");
            return false;
        }
        return true;
    }


    grayscale() {
        let grayArray = []
        for(let i = 0; i < this.imgSize; i++) {
            grayArray[i] = (this.red[i] + this.green[i] + this.blue[i])/3; 
        }

        let line = [];
        let index = 0;
        for(let i = 0; i < this.imgSize; i++) {
            
            if(i%this.imgWidth == 0 && i!=0) {
                this.gray.push(line);
                line = [];
                index = 0;
            }

            line[index] = grayArray[i];
            index++;
        }
        this.gray.push(line);

        this.isGrayscale = true;
        this.gray2RGB();
        this.printModifiedImage();
    }


    gray2RGB() {
        for(let i = 0; i < this.imgHeight; i++) {
            for(let j = 0; j < this.imgWidth; j++) {
                this.red[i*this.imgWidth + j] = this.gray[i][j];
                this.green[i*this.imgWidth + j] = this.gray[i][j];
                this.blue[i*this.imgWidth + j] = this.gray[i][j];
            }
        }
        
    }

    isImageGrayscale() {
        let flag = true;
        for(let i = 0; i < this.imgSize; i++) {
            if( !(this.red[i] == this.green[i] && this.green[i] == this.blue[i]) ) { flag = false; break;}
        }

        if(flag) { this.grayscale(); }
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