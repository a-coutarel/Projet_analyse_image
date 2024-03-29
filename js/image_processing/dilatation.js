import { Generic } from "./generic.js";

export class Dilatation extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Dilatation
     */
    processing() {
        let size = prompt("Please enter the size of the square structuring element :", "3");

        if (!(size == null || size == "") && !isNaN(size)) {
            
            size = parseFloat(size);
            
            if(size >= 1 && size <= this.image.imgWidth && size <= this.image.imgHeight && size%2 == 1) {
                this.doDilatation(size);
            } 
            else alert("Please enter a positive and odd number.");    
        }
    }

    doDilatation(size) {
        let somme;
        let bound = Math.floor(size / 2);
        let bin_copy = JSON.parse(JSON.stringify(this.image.bin));
        for(let i = bound; i < this.image.imgHeight-bound; i++) {
            for(let j = bound; j < this.image.imgWidth-bound; j++) {
                somme = 0;
                for(let k = -bound; k <= bound; k++) {
                    for(let l = -bound; l <= bound; l++) {
                        somme += bin_copy[i+k][j+l];
                    }
                }
                if(somme != 0) { this.image.bin[i][j] = 1; }
            }
        }
    }

    doDilatation4C(size) {
        let somme;
        let bound = Math.floor(size / 2);
        let bin_copy = JSON.parse(JSON.stringify(this.image.bin));
        for(let i = bound; i < this.image.imgHeight-bound; i++) {
            for(let j = bound; j < this.image.imgWidth-bound; j++) {
                somme = 0;
                for(let k = -bound; k <= bound; k++) {
                    for(let l = -bound; l <= bound; l++) {
                        if(k == 0 || l == 0) somme += bin_copy[i+k][j+l];
                    }
                }
                if(somme != 0) { this.image.bin[i][j] = 1; }
            }
        }
    }
    
}