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
        new Erosion(this.image).processing();
        new Dilatation(this.image).processing();
    }
    
}