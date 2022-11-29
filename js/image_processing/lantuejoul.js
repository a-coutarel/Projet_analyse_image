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

        let size = 3;
        let X = new ImageObj(this.image);

        for(let i = 0; i < this.image.imgHeight; i++) {
            for(let j = 0; j < this.image.imgWidth; j++) {
                this.image.bin[i][j] = 0;
            }
        }

        do {

            let E = new ImageObj(X);
            let OE = new ImageObj(X);
            
            this.doErosionTest(E, size);
                
            this.doErosionTest(OE, size);
            this.doErosionTest(OE, 3);
            this.doDilatationTest(OE, 3);
    
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

            size +=2;

        }while(size < 100);
        
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