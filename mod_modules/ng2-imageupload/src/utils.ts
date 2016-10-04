import {ResizeOptions, Conditions} from './interfaces';

export function createImage(url: string, cb: (i: HTMLImageElement) => void) {
    var image = new Image();
    image.onload = function() {
        cb(image);
    };
    image.src = url;
}

const resizeAreaId = 'imageupload-resize-area';

function getResizeArea() {
    let resizeArea = document.getElementById(resizeAreaId);
    if (!resizeArea) {
        resizeArea = document.createElement('canvas');
        resizeArea.id = resizeAreaId;
        resizeArea.style.visibility = 'hidden';
        resizeArea.style.position = 'absolute';
        resizeArea.style.transform = 'translate(-1000px, 0)';
        document.body.appendChild(resizeArea);
    }

    return <HTMLCanvasElement>resizeArea;
}

export function resizeImage(origImage: HTMLImageElement, {
    resizeMaxHeight,
    resizeMaxWidth,
    resizeQuality = 0.7,
    resizeType = 'image/jpeg'
}: ResizeOptions = {}) {
    
    let canvas = getResizeArea();

    let height = origImage.height;
    let width = origImage.width;

    resizeMaxHeight = resizeMaxHeight || resizeMaxWidth;
    resizeMaxWidth = resizeMaxWidth || resizeMaxHeight;

    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > resizeMaxWidth) {
            height = Math.round(height *= resizeMaxWidth / width);
            width = resizeMaxWidth;
        }
    } else {
        if (height > resizeMaxHeight) {
            width = Math.round(width *= resizeMaxHeight / height);
            height = resizeMaxHeight;
        }
    }

    canvas.width = width;
    canvas.height = height;

    //draw image on canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(origImage, 0, 0, width, height);

    // get the data from canvas as 70% jpg (or specified type).
    return canvas.toDataURL(resizeType, resizeQuality);
}

export function checkConditions(file: File, {
    maxHeight = 0,
    maxWidth = 0,
    maxSize = 0,
    types = ['*']
}: Conditions = {}) {
    let checkMaxHeight = true;
    let checkMaxWidth = true;
    let checkMaxSize = true;
    let checkTypes = false;
    let messages: Array<string> = [];

    if(maxHeight > 0) {
        if(file["height"] > maxHeight) {
            console.log("Es mayor!");
            checkMaxHeight = false;
            messages.push(`The height allowed is ${maxHeight}. The image height is ${file["height"]}px`);
        }
    }

    if(maxWidth > 0) {
        if(file["width"] > maxWidth) {
            console.log("Es mayor!");
            checkMaxWidth = false;
            messages.push(`The width allowed is ${maxWidth}. The image width is ${file["width"]}px`);
        }
    }

    if(maxSize > 0) {
        if(file.size > maxSize) {
            console.log("Es mayor!");
            checkMaxSize = false;
            messages.push(`The size allowed is ${maxSize}. The image have ${file.size}`);
        }
    }

    for(let i = 0; i < types.length; i++){
        var re = new RegExp("image/" + types[i], 'g');
        if(re.exec(file.type)) {
            checkTypes = true;
            break;
        }
    }
    if(!checkTypes) {
        messages.push(`The file type ${file.type} is not allowed.`);
    }

    return {
        valid: checkMaxHeight && checkMaxWidth && checkMaxSize && checkTypes,
        error: messages
    };
}


