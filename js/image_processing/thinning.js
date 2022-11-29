import { Generic } from "./generic.js";

export class Thinning extends Generic {
    
    constructor(image) {
        super(image);
    }
    

    /**
     * Thinning
     */
    processing() {
        let number = prompt("Please enter the number of the L-structuring element you want :", "5");

        if (!(number == null || number == "") && !isNaN(number)) {
            
            number = parseFloat(number);
            
            if(number >= 1 && number <= 8 && (number%2 == 1 || number%2 == 0)) {
                this.doThinning(number);
            } 
            else alert("Please enter a correct number.");    
        }
    }

    doThinning(Li) {
        let bin_copy = JSON.parse(JSON.stringify(this.image.bin));
        let structuring_element_check;

        for(let i = 1; i < this.image.imgHeight-1; i++) {
            for(let j = 1; j < this.image.imgWidth-1; j++) {

                switch (Li) {
                    case 1: { structuring_element_check = bin_copy[i-1][j-1] == 1 && bin_copy[i-1][j] == 1 && bin_copy[i-1][j+1] == 1 && bin_copy[i][j] == 1 && bin_copy[i+1][j-1] == 0 && bin_copy[i+1][j] == 0 && bin_copy[i+1][j+1] == 0; break;}
                    case 2: { structuring_element_check = bin_copy[i-1][j] == 1 && bin_copy[i-1][j+1] == 1 && bin_copy[i][j-1] == 0 && bin_copy[i][j] == 1 && bin_copy[i][j+1] == 1 && bin_copy[i+1][j-1] == 0 && bin_copy[i+1][j] == 0; break;}
                    case 3: { structuring_element_check = bin_copy[i-1][j-1] == 0 && bin_copy[i-1][j+1] == 1 && bin_copy[i][j-1] == 0 && bin_copy[i][j] == 1 && bin_copy[i][j+1] == 1 && bin_copy[i+1][j-1] == 0 && bin_copy[i+1][j+1] == 1; break;}
                    case 4: { structuring_element_check = bin_copy[i-1][j-1] == 0 && bin_copy[i-1][j] == 0 && bin_copy[i][j-1] == 0 && bin_copy[i][j] == 1 && bin_copy[i][j+1] == 1 && bin_copy[i+1][j] == 1 && bin_copy[i+1][j+1] == 1; break;}
                    case 5: { structuring_element_check = bin_copy[i-1][j-1] == 0 && bin_copy[i-1][j] == 0 && bin_copy[i-1][j+1] == 0 && bin_copy[i][j] == 1 && bin_copy[i+1][j-1] == 1 && bin_copy[i+1][j] == 1 && bin_copy[i+1][j+1] == 1; break;}
                    case 6: { structuring_element_check = bin_copy[i-1][j] == 0 && bin_copy[i-1][j+1] == 0 && bin_copy[i][j-1] == 1 && bin_copy[i][j] == 1 && bin_copy[i][j+1] == 0 && bin_copy[i+1][j-1] == 1 && bin_copy[i+1][j] == 1; break;}
                    case 7: { structuring_element_check = bin_copy[i-1][j-1] == 1 && bin_copy[i-1][j+1] == 0 && bin_copy[i][j-1] == 1 && bin_copy[i][j] == 1 && bin_copy[i][j+1] == 0 && bin_copy[i+1][j-1] == 1 && bin_copy[i+1][j+1] == 0; break;}
                    case 8: { structuring_element_check = bin_copy[i-1][j-1] == 1 && bin_copy[i-1][j] == 1 && bin_copy[i][j-1] == 1 && bin_copy[i][j] == 1 && bin_copy[i][j+1] == 0 && bin_copy[i+1][j] == 0 && bin_copy[i+1][j+1] == 0; break;}
                }

                if(structuring_element_check) { this.image.bin[i][j] = 0; }
            }
        }     
    }
    
}