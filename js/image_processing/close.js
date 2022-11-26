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
        new Dilatation(this.image).processing();
        new Erosion(this.image).processing();
    }
    
}