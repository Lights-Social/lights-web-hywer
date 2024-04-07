// import {Api} from "../../api"
// import { ref, effect } from 'hywer'
import type { IPhotoAttachment } from '@/data/types/models'
import './picture.css'
import random_id from '../utils/random_id'

//import { pictureWorker } from '../PictureWorker/handler'

interface PictureProps {
    picture: IPhotoAttachment
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


function Picture({picture}: PictureProps) {
    const id = random_id()



    const img = new Image();
    img.alt = picture.alt != "" ? picture.alt : ""
    img.src = `${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${picture.photo_id}.webp`


    img.decode()
    .then(() => {
        document.getElementById(id)!.append(img)
    })
    .catch((encodingError) => {
        // Do something with the error.
    });

    // function handleProcessedData(imageData: ImageData) {
    //     const canvas = document.querySelector(`#pic_${picture.photo_id} .thumbnail`) as HTMLCanvasElement
        
    //     const ctx = canvas.getContext('2d')!;
    //     ctx.putImageData(imageData, 0, 0);
    // }


    // img.src = `${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${picture.photo_id}.webp`

    // const options = {
    //     // родитель целевого элемента - область просмотра
    //     root: null,
    //     // без отступов
    //     rootMargin: '0px',
    //     // процент пересечения - половина изображения
    //     threshold: 0.1
    // }

    // // создаем наблюдатель
    // const observer = new IntersectionObserver((entries, observer) => {
    //     // для каждой записи-целевого элемента
    //     entries.forEach(entry => {
    //         // если элемент является наблюдаемым
    //         if (entry.isIntersecting) {
    //             const lazyImg = entry.target
    //             // выводим информацию в консоль - проверка работоспособности наблюдателя
    //             // loadImage(`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${picture.photo_id}.webp`).then(url => {
    //             //     img.src = url
    //             // })

    //             // меняем фон контейнера
    //             // прекращаем наблюдение
    //             observer.unobserve(lazyImg)
    //         }
    //     })
    // }, options)

    // setTimeout(() => {
    //     observer.observe(document.getElementById('pic_'+picture.photo_id)!)

    // })

    // const preview = new Image();
    // preview.src = picture.preview

    // preview.addEventListener('load', () => {

    //     const RADIUS = 2;
    //     const ITERATIONS = 2;

    //     const canvas = document.createElement('canvas');
    //     canvas.width = preview.width;
    //     canvas.height = preview.height;

    //     const ctx = canvas.getContext('2d')!;
    //     ctx.drawImage(preview, 0, 0);

    //     const canvasRef = document.querySelector(`#pic_${picture.photo_id} .thumbnail`) as HTMLCanvasElement
    //     canvasRef.width = preview.width
    //     canvasRef.height = preview.height

    //     pictureWorker.blurImage(ctx.getImageData(0, 0, canvasRef.width, canvasRef.height), canvasRef.width, canvasRef.height, RADIUS, ITERATIONS, handleProcessedData);

    // })

      
    // Устанавливаем обработчик сообщений от воркера


    return (
        <div id={id} class={"photo"} style={`aspect-ratio: ${picture.width / picture.height}`}>
            <div class="thumbnail"/>
        </div>
    )

}

export default Picture