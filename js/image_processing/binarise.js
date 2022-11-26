import { Generic } from "./generic.js";

export class Binarise extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Binarise
     */
    processing() {
        let threshold;
        if (confirm("Press ok for automatic binarization or cancel to choose the threshold") == true) {
            let sum = 0;
            for(let i = 0; i < this.image.imgHeight; i++) {
                for(let j = 0; j < this.image.imgWidth; j++) {
                    sum += this.image.gray[i][j];
                }
            }
            threshold = sum / this.image.imgSize;
            this.binarise(threshold);
        }
        else {
            threshold = prompt("Please enter a treshold :", "127");

            if (!(threshold == null || threshold == "") && !isNaN(threshold)) {
                
                threshold = parseFloat(threshold);
                
                if(threshold >= 0 && threshold <= 255) {
                    this.binarise(threshold);
                } 
                else alert("Please enter a positive number between 0 and 255.");    
            }
        }
    }

    binarise(threshold) {
        this.image.bin = JSON.parse(JSON.stringify(this.image.gray));

        for(let i = 0; i < this.image.imgHeight; i++) {
            for(let j = 0; j < this.image.imgWidth; j++) {
                if(this.image.bin[i][j] >= threshold) {
                    this.image.bin[i][j] = 1;
                }
                else this.image.bin[i][j] = 0;
            }
        }

        this.image.isBinary = true;
        this.binUpdate();
    }
    
}