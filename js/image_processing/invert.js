import { Generic } from "./generic.js";

export class Invert extends Generic {
    
    constructor(image) {
        super(image)
    }
    
    processing() {
        for(let i = 0; i < this.image.imgSize; i++) {
            this.image.red[i] = 255 - this.image.red[i];
            this.image.green[i] = 255 - this.image.green[i];
            this.image.blue[i] = 255 - this.image.blue[i];
        }
        this.image.printModifiedImage();
        
    }
    
    
}