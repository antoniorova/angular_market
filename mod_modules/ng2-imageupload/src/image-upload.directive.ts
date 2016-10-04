import {Directive, ElementRef,
    OnInit, Input, Output, EventEmitter, Renderer, HostListener} from '@angular/core';

import {ImageResult, ResizeOptions, Conditions} from './interfaces';
import {createImage, resizeImage, checkConditions} from './utils';    

@Directive({
    selector: 'input[type=file][image-upload]'
})
export class ImageUploadDirective {

    @Output() imageSelected = new EventEmitter<ImageResult>();

    @Input() resizeOptions: ResizeOptions;

    @Input() conditions: Conditions;

    constructor(private _elementref: ElementRef, private _renderer: Renderer) {
    }

    @HostListener('change', ['$event'])
    private readFiles(event) {
        for (let file of event.target.files) {
                let result: ImageResult = {
                    file: file,
                    url: URL.createObjectURL(file)
                };
                this.fileToDataURL(file, result).then(r => this.resize(r)).then(r => this.imageSelected.emit(r));
        }
    }

    private resize(result: ImageResult): Promise<ImageResult> {
        return new Promise((resolve) => {
            if (this.resizeOptions) {
                createImage(result.url, image => {
                    let dataUrl = resizeImage(image, this.resizeOptions);
                    result.resized = {
                        dataURL: dataUrl,
                        type: dataUrl.match(/:(.+\/.+;)/)[1]
                    };
                    result.file["height"] = image.height;
                    result.file["width"] = image.width;
                    resolve(result);
                });
            } else {
                resolve(result);
            }
        });
    }

    private fileToDataURL(file: File, result: ImageResult): Promise<ImageResult> {
        return new Promise((resolve) => {
            let reader = new FileReader();
            reader.onload = function(e) {
                result.dataURL = reader.result;
                resolve(result);
            };
            reader.readAsDataURL(file);
        });
    }
}


