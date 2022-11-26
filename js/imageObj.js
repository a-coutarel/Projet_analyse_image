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
    
    old_image = [];
    

    constructor(original) {
    
        if(original instanceof ImageObj) {
            this.image = original.image;
            this.canvas = original.canvas;
            this.context = original.context;
            this.imageData = original.imageData;
            this.data = original.data;
    
            this.red = original.red;
            this.green = original.green;
            this.blue = original.blue;
            this.gray = original.gray;
            this.imgSize = original.imgSize;
            this.imgWidth = original.imgWidth;
            this.imgHeight = original.imgHeight;
            this.isGrayscale = original.isGrayscale;

            this.old_image = original.old_image;
        } else {
            this.image = new Image();
            this.canvas = document.getElementById('imageViewer');
            this.context = this.canvas.getContext('2d');
            this.isGrayscale = false;
        }
    }


    /**
     * Initialises attributes and print the image in the canvas (also adapt the canva's ratio to the image's ratio)
     * This function is called when an image is loaded
     */
    loadImage() {
    
        let width = parseInt(this.image.width);
        let height = parseInt(this.image.height);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.drawImage(this.image, 0,0);
        
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
     * Check if the image is grayscale when it's imported. If yes, calls gets the datas of the image in the gray attribute (array) and sets isGrayscale to true
     */
    isImageGrayscale() {
        let flag = true;
        for(let i = 0; i < this.imgSize; i++) {
            if( !(this.red[i] == this.green[i] && this.green[i] == this.blue[i]) ) { flag = false; break;}
        }

        if(flag) { 
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
         }
    }


    /**
     * Resets the canvas with the image placed in parameter
     * @param {*} img 
     */
    reset(img) {
        this.image = img;
        this.loadImage();
    }


    /**
     * Print the image from data
     */
     print() {
        let index = 0;
        for(let i = 0; i < this.image.data.length; i += 4) {
            this.image.data[i] = this.image.red[index];
            this.image.data[i + 1] = this.image.green[index];
            this.image.data[i + 2] = this.image.blue[index];
            index++;
        }

        this.image.context.putImageData(this.image.imageData, 0, 0);
    }

}