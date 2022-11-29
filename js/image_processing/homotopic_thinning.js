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

        let loop = 0;
        let idempotence = false;
        let prev_bin = JSON.parse(JSON.stringify(this.image.bin));

        do {
            new Thinning(this.image).doThinning(loop%8 + 1);
            if(loop%8 + 1 == 8) {
                idempotence = this.idempotence(prev_bin);
                if(!idempotence) prev_bin = JSON.parse(JSON.stringify(this.image.bin));
            }
            loop++;
        } while(!idempotence)
    }

}