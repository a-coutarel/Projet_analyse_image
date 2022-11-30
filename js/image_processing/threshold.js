import { Generic } from "./generic.js";

export class Threshold extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Threshold
     */
    processing() {
       
        let thresholdNum = prompt("Please enter the number of the threshold you want : \n1. Truncate Threshold \n2. Truncate Threshold inverted \n3. Threshold to zero \n4. Threshold to zero inverted", "1");

        if (!(thresholdNum == null || thresholdNum == "") && !isNaN(thresholdNum)) {
            
            thresholdNum = parseFloat(thresholdNum);
            
            if(thresholdNum == 1 || thresholdNum == 2 || thresholdNum == 3 || thresholdNum == 4) {

                let threshold = prompt("Please enter a treshold :", "127");

                if (!(threshold == null || threshold == "") && !isNaN(threshold)) {
                    
                    threshold = parseFloat(threshold);
                    
                    if(threshold >= 0 && threshold <= 255) {
                        switch(thresholdNum) {
                            case 1 : { this.doTruncate(threshold); break; }
                            case 2 : { this.doTruncateInverted(threshold); break; }
                            case 3 : { this.doToZero(threshold); break; }
                            case 4 : { this.doToZeroInverted(threshold); break; }
                        }
                    } 
                    else alert("Please enter a positive number between 0 and 255.");    
                }
            } 
            else alert("Please enter a correct number.");    
        }
    }

    /**
     * Truncate thresholding
     * @param {*} threshold 
     */
    doTruncate(threshold) {
        for(let i = 0; i < this.image.imgSize; i++) {
            if(this.image.red[i] > threshold) this.image.red[i] = threshold;
            if(this.image.green[i] > threshold) this.image.green[i] = threshold;
            if(this.image.blue[i] > threshold) this.image.blue[i] = threshold;
        }
    }


    /**
     * Truncate thresholding inverted
     * @param {*} threshold 
     */
     doTruncateInverted(threshold) {
        for(let i = 0; i < this.image.imgSize; i++) {
            if(this.image.red[i] < threshold) this.image.red[i] = threshold;
            if(this.image.green[i] < threshold) this.image.green[i] = threshold;
            if(this.image.blue[i] < threshold) this.image.blue[i] = threshold;
        }
    }


    /**
     * Threshold to zero
     * @param {*} threshold 
     */
     doToZero(threshold) {
        for(let i = 0; i < this.image.imgSize; i++) {
            if(this.image.red[i] < threshold) this.image.red[i] = 0;
            if(this.image.green[i] < threshold) this.image.green[i] = 0;
            if(this.image.blue[i] < threshold) this.image.blue[i] = 0;
        }
    }


    /**
     * Threshold to zero inverted
     * @param {*} threshold 
     */
     doToZeroInverted(threshold) {
        for(let i = 0; i < this.image.imgSize; i++) {
            if(this.image.red[i] > threshold) this.image.red[i] = 0;
            if(this.image.green[i] > threshold) this.image.green[i] = 0;
            if(this.image.blue[i] > threshold) this.image.blue[i] = 0;
        }
    }
    
}