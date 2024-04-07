import ImageWorker from "./worker?worker&inline"

class PictureWorker {
    worker: Worker

    constructor() {
        this.worker = new ImageWorker()
        this.worker.onmessage = this.handleWorkerMessage.bind(this)
    }
    blurImage(imageData: ImageData, width: number, height: number, radius: number, iterations: number, callback: (imageData: ImageData) => void) {
        this.worker.postMessage({imageData: imageData, width: width, height: height, radius: radius, iterations: iterations, callback})
    }

    handleWorkerMessage(e: MessageEvent<{imageData: ImageData, callback: (imageData: ImageData) => void}>) {
        const { imageData, callback } = e.data;

        callback(imageData)


        
    }
}

export const pictureWorker = new PictureWorker()