import { ImageObj } from "../ImageObj.js";
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

        let n = 0;
        let Ex = new ImageObj(this.image);
        let OEx;

        for(let i = 0; i < this.image.imgHeight; i++) {
            for(let j = 0; j < this.image.imgWidth; j++) {
                this.image.bin[i][j] = 0;
            }
        }

        let stop;

        do {

            if(n > 0) {
                new Erosion(Ex).doErosion4C(3);  

                stop = true;

                for(let i = 0; i < this.image.imgHeight; i++) {
                    for(let j = 0; j < this.image.imgWidth; j++) {
                        if(Ex.bin[i][j] == 1) {stop = false; break;};
                    }
                }
            }

            OEx = new ImageObj(Ex);
            new Open(OEx).doOpening4C(3);

            for(let i = 0; i < this.image.imgHeight; i++) {
                for(let j = 0; j < this.image.imgWidth; j++) {
                    if(this.image.bin[i][j] == 1 || Ex.bin[i][j] - OEx.bin[i][j] == 1) this.image.bin[i][j] = 1;
                }
            }

            n ++;
            
        } while(!stop);
        
    }
    
}