export interface ImageResult {
    file: File;
    url: string;
    dataURL?: string;
    resized?: {
        dataURL: string;
        type: string;
    }
}

export interface ResizeOptions {
    resizeMaxHeight?: number;
    resizeMaxWidth?: number;
    resizeQuality?: number;
    resizeType?: string;
}

export interface Conditions {
    maxHeight?: number;
    maxWidth?: number;
    maxSize?: number;
    types?: Array<string>;
}
