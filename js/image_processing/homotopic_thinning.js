import { Generic } from "./generic.js";
import { Thinning } from "./thinning.js";

export class HomotopicThickening extends Generic {
    
    constructor(image) {
        super(image);
    }
    

    /**
     * Skeleton : Homotopic Thickening method
     */
    processing() {

        let idempotence = false;
        let prev_bin = JSON.parse(JSON.stringify(this.image.bin));

        do {
            new Thinning(this.image).doThinning();
            idempotence = this.idempotence(prev_bin);
            if(!idempotence) prev_bin = JSON.parse(JSON.stringify(this.image.bin));
        } while(!idempotence)
    }

}