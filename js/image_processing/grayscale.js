import { Generic } from "./generic.js";

export class Grayscale extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Converts the image in grayscale (average of the 3 components RGB)
     * Sets isGrayscale attribute to true
     * Calls gray2RGB() to preprare the image for printing (from gray array to red green and blue arrays)
     */
    processing() {
        let grayArray = []
        for(let i = 0; i < this.image.imgSize; i++) {
            grayArray[i] = (this.image.red[i] + this.image.green[i] + this.image.blue[i])/3; 
        }

        let line = [];
        let index = 0;
        for(let i = 0; i < this.image.imgSize; i++) {
            
            if(i%this.image.imgWidth == 0 && i!=0) {
                this.image.gray.push(line);
                line = [];
                index = 0;
            }

            line[index] = grayArray[i];
            index++;
        }
        this.image.gray.push(line);

        this.image.isGrayscale = true;
        this.gray2RGB();
    }
    
}