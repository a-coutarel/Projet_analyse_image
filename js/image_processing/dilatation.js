import { Generic } from "./generic.js";

export class Dilatation extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Dilatation
     */
    processing() {
        let somme;
        let bin_copy = JSON.parse(JSON.stringify(this.image.bin));
        for(let i = 1; i < this.image.imgHeight-1; i++) {
            for(let j = 1; j < this.image.imgWidth-1; j++) {
                somme = 0;
                for(let k = -1; k <= 1; k++) {
                    for(let l = -1; l <= 1; l++) {
                        somme += bin_copy[i+k][j+l];
                    }
                }
                if(somme != 0) { this.image.bin[i][j] = 1; }
            }
        }
    }
    
}