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
    bin = [];
    
    imgSize;
    imgWidth;
    imgHeight;
    isGrayscale;
    isBinary;

    prev_image;
    

    constructor(original) {
    
        if(original instanceof ImageObj) {
            this.image = original.image;
            this.canvas = original.canvas;
            this.context = original.context;
            this.imageData = original.imageData;
            this.data = original.data;
    
            this.red = JSON.parse(JSON.stringify(original.red));
            this.green = JSON.parse(JSON.stringify(original.green));
            this.blue = JSON.parse(JSON.stringify(original.blue));
            this.gray = JSON.parse(JSON.stringify(original.gray));
            this.bin = JSON.parse(JSON.stringify(original.bin));
            this.imgSize = original.imgSize;
            this.imgWidth = original.imgWidth;
            this.imgHeight = original.imgHeight;
            this.isGrayscale = JSON.parse(JSON.stringify(original.isGrayscale));
            this.isBinary = JSON.parse(JSON.stringify(original.isBinary));

            this.prev_image = original.prev_image;
        } else {
            this.image = new Image();
            this.canvas = document.getElementById('imageViewer');
            this.context = this.canvas.getContext('2d');
            this.isGrayscale = false;
            this.isBinary = false;
        }
    }


    /**
     * Initialises attributes and print the image in the canvas (also adapt the canva's ratio to the image's ratio)
     * This function is called when an image is loaded
     */
    loadImage() {
    
        this.canvas.width = parseInt(this.image.width);
        this.canvas.height = parseInt(this.image.height);
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
        this.isImageBinary();
    }


    /**
     * Check if the image is grayscale when it's imported. If yes, gets the datas of the image in the gray attribute (array) and sets isGrayscale to true
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
     * Check if the image is binary when it's imported. If yes, gets the datas of the image in the bin attribute (array) and sets isBinary to true
     */
     isImageBinary() {
        if(this.isGrayscale) {

            let flag = true;

            for(let i = 0; i < this.imgHeight; i++) {
                for(let j = 0; j < this.imgWidth; j++) {
                    if( this.gray[i][j] != 255 && this.gray[i][j] != 0 )  { 
                        flag = false; break;
                    }
                }
            }
            
            if(flag) { 
                this.bin = JSON.parse(JSON.stringify(this.gray));

                for(let i = 0; i < this.imgHeight; i++) {
                    for(let j = 0; j < this.imgWidth; j++) {
                        this.bin[i][j] = this.gray[i][j] / 255;
                    }
                }

                this.isBinary = true;
             }
        
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
        for(let i = 0; i < this.data.length; i += 4) {
            this.data[i] = this.red[index];
            this.data[i + 1] = this.green[index];
            this.data[i + 2] = this.blue[index];
            index++;
        }

        this.context.putImageData(this.imageData, 0, 0);
    }

}