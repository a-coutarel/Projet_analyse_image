import { Dilatation } from "./dilatation.js";
import { Erosion } from "./erosion.js";
import { Generic } from "./generic.js";

export class Open extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Open
     */
    processing() {
        let size = prompt("Please enter the size of the square structuring element :", "3");

        if (!(size == null || size == "") && !isNaN(size)) {
            
            size = parseFloat(size);
            
            if(size >= 1 && size <= this.image.imgWidth && size <= this.image.imgHeight && size%2 == 1) {
                this.doOpening(size);
            } 
            else alert("Please enter a positive and odd number.");    
        }
    }

    doOpening(size) {
        new Erosion(this.image).doErosion(size);
        new Dilatation(this.image).doDilatation(size);
    }

    doOpening4C(size) {
        new Erosion(this.image).doErosion4C(size);
        new Dilatation(this.image).doDilatation4C(size);
    }
    
}