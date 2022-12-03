import { ImageObj } from "../ImageObj.js";
import { Dilatation } from "./dilatation.js";
import { Erosion } from "./erosion.js";
import { Generic } from "./generic.js";
import { Open } from "./open.js";

export class Lantuejoul extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Lantuejoul skeleton
     */
    processing() {

        let n = 1;
        let X = new ImageObj(this.image);
        let Ex, OEx;

        for(let i = 0; i < this.image.imgHeight; i++) {
            for(let j = 0; j < this.image.imgWidth; j++) {
                this.image.bin[i][j] = 0;
            }
        }

        let idempotence = false;
        let prev_bin = JSON.parse(JSON.stringify(this.image.bin));

        do {

            Ex = new ImageObj(X);
            
            for(let i = 0; i < n; i++) { new Erosion(Ex).doErosionCross(3); }
            
            OEx = new ImageObj(Ex);
                
            new Open(OEx).doOpeningCross(3);

            for(let i = 0; i < this.image.imgHeight; i++) {
                for(let j = 0; j < this.image.imgWidth; j++) {
                    if(this.image.bin[i][j] == 1 || Ex.bin[i][j] - OEx.bin[i][j] == 1) this.image.bin[i][j] = 1;
                }
            }

            idempotence = this.idempotence(prev_bin);
            if(!idempotence) prev_bin = JSON.parse(JSON.stringify(this.image.bin));

            n ++;

        }while(!idempotence);
        
    }
    
}