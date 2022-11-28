import { Dilatation } from "./dilatation.js";
import { Erosion } from "./erosion.js";
import { Generic } from "./generic.js";

export class Close extends Generic {
    
    constructor(image) {
        super(image)
    }
    

    /**
     * Close
     */
    processing() {
        let size = prompt("Please enter the size of the structuring element :", "3");

        if (!(size == null || size == "") && !isNaN(size)) {
            
            size = parseFloat(size);
            
            if(size >= 1 && size <= this.image.imgWidth && size <= this.image.imgHeight && size%2 == 1) {
                new Dilatation(this.image).doDilatation(size);
                new Erosion(this.image).doErosion(size);
            } 
            else alert("Please enter a positive and odd number.");    
        }
    }
    
}