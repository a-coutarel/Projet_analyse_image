import { ImageObj } from "../ImageObj.js";

export class Generic {
    
    image;
    
    
    constructor(image) {
        if(image instanceof ImageObj) {
            this.image = image;
            this.image.old_image = new ImageObj(image);
        }
    }
    
    out() {
        if(this.image instanceof ImageObj) {
            this.processing();
        } else {
            alert("Please use a valid image");
        }
            
    }
    
    processing() {
        throw "This method must be redefined!";
    }
    
    
    /**
     * Check if the image is grayscale
     * @returns true or false
     */
     grayscaleCheck() {
        if(!this.image.isGrayscale) {
            alert("The image must be converted to grayscale first.\nPlease use the grayscale function.");
            return false;
        }
        return true;
    }
    

    /**
     * Copies the data of the gray 2D array attribute in red, green and blue 1D array attributes
     * Mendatory before print a graycale image because canvas need 3 1D-arrays (red, green, blue) to draw an image
     */
    gray2RGB() {
        for(let i = 0; i < this.image.imgHeight; i++) {
            for(let j = 0; j < this.image.imgWidth; j++) {
                this.image.red[i*this.image.imgWidth + j] = this.image.gray[i][j];
                this.image.green[i*this.image.imgWidth + j] = this.image.gray[i][j];
                this.image.blue[i*this.image.imgWidth + j] = this.image.gray[i][j];
            }
        }
    }
    
}