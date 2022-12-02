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

        for(let i = 0; i < this.image.imgHeight; i++) {
            for(let j = 0; j < this.image.imgWidth; j++) {
                this.image.bin[i][j] = 0;
            }
        }

        let idempotence = false;
        let prev_bin = JSON.parse(JSON.stringify(this.image.bin));

        do {

            let E = new ImageObj(X);
            let OE = new ImageObj(X);
            
            for(let i = 0; i < n; i++) {
                this.doErosionTest(E, 3)
            }

            for(let i = 0; i < n; i++) {
                this.doErosionTest(OE, 3)
            }
                
            this.doErosionTest(OE, 3)
            this.doDilatationTest(OE, 3)
    
            for(let i = 0; i < this.image.imgHeight; i++) {
                for(let j = 0; j < this.image.imgWidth; j++) {
                    if(E.bin[i][j] == 1) E.bin[i][j] -= OE.bin[i][j];
                }
            }

            for(let i = 0; i < this.image.imgHeight; i++) {
                for(let j = 0; j < this.image.imgWidth; j++) {
                    if(this.image.bin[i][j] == 1 || E.bin[i][j] == 1) this.image.bin[i][j] = 1;
                }
            }

            idempotence = this.idempotence(prev_bin);
            if(!idempotence) prev_bin = JSON.parse(JSON.stringify(this.image.bin));

            n ++;

        }while(!idempotence);
        
    }

    doDilatationTest(imgObj, size) {
        let somme;
        let bound = Math.floor(size / 2);
        let bin_copy = JSON.parse(JSON.stringify(imgObj.bin));
        for(let i = bound; i < imgObj.imgHeight-bound; i++) {
            for(let j = bound; j < imgObj.imgWidth-bound; j++) {
                somme = 0;
                for(let k = -bound; k <= bound; k++) {
                    for(let l = -bound; l <= bound; l++) {
                        if(k == 0 || l == 0) somme += bin_copy[i+k][j+l];
                    }
                }
                if(somme != 0) { imgObj.bin[i][j] = 1; }
            }
        }
    }

    doErosionTest(imgObj, size) {
        let somme;
        let bound = Math.floor(size / 2);
        let bin_copy = JSON.parse(JSON.stringify(imgObj.bin));
        for(let i = bound; i < imgObj.imgHeight-bound; i++) {
            for(let j = bound; j < imgObj.imgWidth-bound; j++) {
                somme = 0;
                for(let k = -bound; k <= bound; k++) {
                    for(let l = -bound; l <= bound; l++) {
                        if(k == 0 || l == 0) somme += bin_copy[i+k][j+l];
                    }
                }
                if(somme != (size*2-1)) { imgObj.bin[i][j] = 0; }
            }
        }
    }
    
}