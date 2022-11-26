import { ImageObj } from "../ImageObj.js";

export class Generic {
    
    image;
    
    constructor(image) {
        if(image instanceof ImageObj) {
            this.image = image;
        }
    }


    processing() {
        throw "This method must be redefined !";
    }
    

    outRGBProcessing() {
        if(this.image instanceof ImageObj) {
            this.image.prev_image = new ImageObj(this.image);
            this.processing();
            this.rgbUpdate();
            this.printModifiedImage();
        } else {
            alert("Please import a valid image.");
        } 
    }


    outGrayscaleProcessing() {
        if(this.image instanceof ImageObj) {
            if(this.image.isGrayscale) {
                this.image.prev_image = new ImageObj(this.image);
                this.processing();
                this.grayUpdate();
                this.printModifiedImage();
            }
            else {
                alert("The image must be converted to grayscale first.\nPlease use the grayscale function.");
            }
        } else {
            alert("Please import a valid image.");
        } 
    }


    outBinaryProcessing() {
        if(this.image instanceof ImageObj) {
            if(this.image.isBinary) {
                this.image.prev_image = new ImageObj(this.image);
                this.processing();
                this.binUpdate();
                this.printModifiedImage();
            }
            else {
                alert("The image must be binarised first.\nPlease use the binarise function.");
            }
        } else {
            alert("Please import a valid image.");
        } 
    }


    /**
     * Print the image from data
     */
     printModifiedImage() {
        let index = 0;
        for(let i = 0; i < this.image.data.length; i += 4) {
            this.image.data[i] = this.image.red[index];
            this.image.data[i + 1] = this.image.green[index];
            this.image.data[i + 2] = this.image.blue[index];
            index++;
        }

        this.image.context.putImageData(this.image.imageData, 0, 0);
    }
    

    /**
     * Converts the data of the gray 2D array attribute in red, green and blue 1D array attributes et bin attribute
     * Mendatory before print a graycale image because canvas need 3 components (1D-arrays red, green, blue) to draw an image
     */
    grayUpdate() {
        for(let i = 0; i < this.image.imgHeight; i++) {
            for(let j = 0; j < this.image.imgWidth; j++) {
                this.image.red[i*this.image.imgWidth + j] = this.image.gray[i][j];
                this.image.green[i*this.image.imgWidth + j] = this.image.gray[i][j];
                this.image.blue[i*this.image.imgWidth + j] = this.image.gray[i][j];

                if(this.image.isBinary) this.image.bin[i][j] = this.image.gray[i][j]/255;
            }
        }
    }
    

    /**
     * Converts the data of red, green and blue 1D array attributes in the gray 2D array attribute and bin attribute
     * Useful when an RGB proccesing is operated on a grayscale image, in order to update the gray array attribute
     */
     rgbUpdate() {
        if(this.image.isGrayscale) {
            for(let i = 0; i < this.image.imgHeight; i++) {
                for(let j = 0; j < this.image.imgWidth; j++) {
                    this.image.gray[i][j] = this.image.red[i*this.image.imgWidth + j];
                }
            }
        }

        if(this.image.isBinary) {
            for(let i = 0; i < this.image.imgHeight; i++) {
                for(let j = 0; j < this.image.imgWidth; j++) {
                    this.image.bin[i][j] = this.image.red[i*this.image.imgWidth + j]/255;
                }
            }
        }
    }


    /**
     * Converts the data of the bin 2D array attribute in red, green and blue 1D array attributes et gray attribute
     * Mendatory before print a binary image because canvas need 3 components (1D-arrays red, green, blue) to draw an image
     */
    binUpdate() {
        for(let i = 0; i < this.image.imgHeight; i++) {
            for(let j = 0; j < this.image.imgWidth; j++) {
                this.image.red[i*this.image.imgWidth + j] = this.image.bin[i][j]*255;
                this.image.green[i*this.image.imgWidth + j] = this.image.bin[i][j]*255;
                this.image.blue[i*this.image.imgWidth + j] = this.image.bin[i][j]*255;

                this.image.gray[i][j] = this.image.bin[i][j]*255;
            }
        }
    }
    
}