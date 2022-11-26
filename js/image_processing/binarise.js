import { Generic } from "./generic.js";

export class Binarise extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Binarise
     */
    processing() {
        let threshold = prompt("Please enter a treshold :", "127");
        if ( !(threshold == null || threshold == "") && !isNaN(threshold) ) {
            
            threshold = parseFloat(threshold);
            
            if(threshold > 0 && threshold < 255) {
                
                this.image.bin = JSON.parse(JSON.stringify(this.image.gray));

                for(let i = 0; i < this.image.imgHeight; i++) {
                    for(let j = 0; j < this.image.imgWidth; j++) {
                        if(this.image.bin[i][j] > threshold) {
                            this.image.bin[i][j] = 1;
                        }
                        else this.image.bin[i][j] = 0;
                    }
                }

                this.image.isBinary = true;
                this.binUpdate();
            } 
            else alert("Please enter a positive number between 1 and 254.");
        }
    }
    
}