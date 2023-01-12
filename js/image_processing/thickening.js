import { Generic } from "./generic.js";

export class Thickening extends Generic {
    
    constructor(image) {
        super(image);
    }
    

    /**
     * Thickening
     */
    processing() {
        this.doThickening();
    }

    doThickening() {
        for(let Li=1; Li<9; Li++) {
            let bin_copy = JSON.parse(JSON.stringify(this.image.bin));
            let structuring_element_check;

            for(let i = 1; i < this.image.imgHeight-1; i++) {
                for(let j = 1; j < this.image.imgWidth-1; j++) {

                    switch (Li) {
                        case 1: { structuring_element_check = bin_copy[i-1][j-1] == 1 && bin_copy[i-1][j] == 1 && bin_copy[i-1][j+1] == 1 && bin_copy[i][j] == 0 && bin_copy[i+1][j-1] == 0 && bin_copy[i+1][j] == 0 && bin_copy[i+1][j+1] == 0; break;}
                        case 2: { structuring_element_check = bin_copy[i-1][j] == 1 && bin_copy[i-1][j+1] == 1 && bin_copy[i][j-1] == 0 && bin_copy[i][j] == 0 && bin_copy[i][j+1] == 1 && bin_copy[i+1][j-1] == 0 && bin_copy[i+1][j] == 0; break;}
                        case 3: { structuring_element_check = bin_copy[i-1][j-1] == 0 && bin_copy[i-1][j+1] == 1 && bin_copy[i][j-1] == 0 && bin_copy[i][j] == 0 && bin_copy[i][j+1] == 1 && bin_copy[i+1][j-1] == 0 && bin_copy[i+1][j+1] == 1; break;}
                        case 4: { structuring_element_check = bin_copy[i-1][j-1] == 0 && bin_copy[i-1][j] == 0 && bin_copy[i][j-1] == 0 && bin_copy[i][j] == 0 && bin_copy[i][j+1] == 1 && bin_copy[i+1][j] == 1 && bin_copy[i+1][j+1] == 1; break;}
                        case 5: { structuring_element_check = bin_copy[i-1][j-1] == 0 && bin_copy[i-1][j] == 0 && bin_copy[i-1][j+1] == 0 && bin_copy[i][j] == 0 && bin_copy[i+1][j-1] == 1 && bin_copy[i+1][j] == 1 && bin_copy[i+1][j+1] == 1; break;}
                        case 6: { structuring_element_check = bin_copy[i-1][j] == 0 && bin_copy[i-1][j+1] == 0 && bin_copy[i][j-1] == 1 && bin_copy[i][j] == 0 && bin_copy[i][j+1] == 0 && bin_copy[i+1][j-1] == 1 && bin_copy[i+1][j] == 1; break;}
                        case 7: { structuring_element_check = bin_copy[i-1][j-1] == 1 && bin_copy[i-1][j+1] == 0 && bin_copy[i][j-1] == 1 && bin_copy[i][j] == 0 && bin_copy[i][j+1] == 0 && bin_copy[i+1][j-1] == 1 && bin_copy[i+1][j+1] == 0; break;}
                        case 8: { structuring_element_check = bin_copy[i-1][j-1] == 1 && bin_copy[i-1][j] == 1 && bin_copy[i][j-1] == 1 && bin_copy[i][j] == 0 && bin_copy[i][j+1] == 0 && bin_copy[i+1][j] == 0 && bin_copy[i+1][j+1] == 0; break;}
                    }

                    if(structuring_element_check) { this.image.bin[i][j] = 1; }
                }
            }
        }
    }
    
}