import { Generic } from "./generic.js";

export class Threshold extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Threshold
     */
    processing() {
       
        let threshold = prompt("Please enter a treshold :", "127");

        if (!(threshold == null || threshold == "") && !isNaN(threshold)) {
            
            threshold = parseFloat(threshold);
            
            if(threshold >= 0 && threshold <= 255) {
                this.doThreshold(threshold);
            } 
            else alert("Please enter a positive number between 0 and 255.");    
        }
    }

    /**
     * Truncate thresholding
     * @param {*} threshold 
     */
    doThreshold(threshold) {

        for(let i = 0; i < this.image.imgSize; i++) {
            if(this.image.red[i] > threshold) this.image.red[i] = threshold;
            if(this.image.green[i] > threshold) this.image.green[i] = threshold;
            if(this.image.blue[i] > threshold) this.image.blue[i] = threshold;
        }

    }
    
}