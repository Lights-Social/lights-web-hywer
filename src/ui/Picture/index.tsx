import type { IMediaAttachment } from '@/data/types/models'
import './picture.css'
import random_id from '../utils/random_id'
import * as blurhash from "blurhash-wasm";

//import { pictureWorker } from '../PictureWorker/handler'

interface PictureProps {
    picture?: IMediaAttachment
    src: string
    onClick?: () => void
}

// export async function loadImage(url: string, onProgress?: (event: ProgressEvent) => void): Promise<string> {
//     const response = fetch(url, {
//         method: "GET",
//     })
//     const resp = await response
//     const reader = resp.body!.getReader();

//     const contentLength = resp.headers.get('Content-Length');

//     let receivedLength = 0; // количество байт, полученных на данный момент
//     let chunks = [];

//     while(true) {
//         const {done, value} = await reader.read();

//         if (done) {
//             break;
//         }

//         chunks.push(value);
//         receivedLength += value.length;

//         //console.log(`Получено ${receivedLength} из ${contentLength}`)
//     }

//     let chunksAll = new Uint8Array(receivedLength); // (4.1)
//     let position = 0;
//     for(let chunk of chunks) {
//         chunksAll.set(chunk, position); // (4.2)
//         position += chunk.length;
//     }

//     let array = Array.from(chunksAll);

//     // Преобразуйте массив в строку base64
//     let base64String = btoa(array.reduce((data, byte) => data + String.fromCharCode(byte), ''));

//     let imageDataURI = `data:image/webp;base64,${base64String}`;
//     return imageDataURI

// }


function Picture({picture, src, onClick}: PictureProps) {
    const id = random_id()

    const WIDTH = 32; // pixels
    const HEIGHT = 32; // pixels

    const img = new Image();
    img.alt = picture && picture.alt != "" ? picture.alt : ""
    img.src = picture ? `${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${picture.id}.webp` : src



    setTimeout(() => {
        img.decode()
        .then(() => {
            const elem = document.getElementById(id)

            if (elem) {
                elem.append(img)
            }

        })
        .catch((encodingError) => {
            console.log(encodingError)
        });

        try {
            if (!picture) return

            const pixels = blurhash.decode(picture.blurhash, WIDTH, HEIGHT);
            // Set the pixels to the canvas
            const asClamped = new Uint8ClampedArray(pixels!);
            const imageData = new ImageData(asClamped, WIDTH, HEIGHT);
    
            const canvasEl = document.querySelector<HTMLCanvasElement>(`#${id} canvas`);
    
            if (canvasEl) {
              const ctx = canvasEl.getContext('2d');
              ctx!.putImageData(imageData, 0, 0);
            }
        } catch (error) {
            if (!picture) return

            console.log(picture.id)
            console.error(error);
        }
    })


    return (
        <div onClick={onClick ? () => onClick() : undefined} id={id} class={"photo"} style={`aspect-ratio: ${picture ? picture.width / picture.height : 1}`}>
            <canvas
                width={WIDTH}
                height={HEIGHT}
                class="thumbnail"
            />
            {/* <div class="thumbnail"/> */}
        </div>
    )

}

export default Picture