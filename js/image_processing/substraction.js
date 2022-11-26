import { Generic } from "./generic.js";

export class Substraction extends Generic {

    second_img;
    
    constructor(image, img) {
        super(image)
        this.second_img = img;
        this.loadSecondImage();
    }
    

    /**
     * Addition
     */
    processing() {
        if(this.second_img.imgWidth == this.image.imgWidth && this.second_img.imgHeight == this.image.imgHeight) {
            for(let i =0; i < this.image.imgSize; i++) {
                if(this.image.red[i] - this.second_img.red[i] < 0) this.image.red[i] = 0;
                else this.image.red[i] -= this.second_img.red[i];

                if(this.image.green[i] - this.second_img.green[i] < 0) this.image.green[i] = 0;
                else this.image.green[i] -= this.second_img.green[i];

                if(this.image.blue[i] - this.second_img.blue[i] < 0) this.image.blue[i] = 0;
                else this.image.blue[i] -= this.second_img.blue[i];
            }
        }
        else alert("Please select images with the same dimensions.")
    }


    loadSecondImage() {
        
        this.second_img.canvas = document.createElement('canvas');
        this.second_img.context = this.second_img.canvas.getContext('2d');
        this.second_img.canvas.width = parseInt(this.second_img.image.width);
        this.second_img.canvas.height = parseInt(this.second_img.image.height);
        this.second_img.context.drawImage(this.second_img.image, 0,0);
        this.second_img.imageData = this.second_img.context.getImageData(0, 0, this.second_img.image.width, this.second_img.image.height);
        this.second_img.data = this.second_img.imageData.data;

        let index = 0;

        for(let i = 0; i < this.second_img.data.length; i += 4) {
            this.second_img.red[index] = this.second_img.data[i];
            this.second_img.green[index] = this.second_img.data[i + 1];
            this.second_img.blue[index] = this.second_img.data[i + 2];
            index++;
        }

        this.second_img.imgSize = index;
        this.second_img.imgWidth = this.second_img.image.width;
        this.second_img.imgHeight = this.second_img.image.height;
    }
    
}