import type { IProfile } from '@/data/types/models';
import { HSLtoString, generateHSL } from '@/ui/utils/HSLgen';
import { FastAverageColor } from 'fast-average-color';
import * as blurhash from "blurhash-wasm";
import type { RecReactiveProxy } from 'hywer/x/store';
import { effect } from 'hywer/jsx-runtime';


interface CoverProps {
	profile: RecReactiveProxy<IProfile>;
}

export default function Cover(props: CoverProps) {

    async function setCoverColor() {
        const coverElement = document.querySelector<HTMLDivElement>('.cover')
        if (props.profile.avatar.val[0]) {

            const pixels = blurhash.decode(props.profile.avatar.val[0].blurhash, 32, 32);
            // Set the pixels to the canvas
            const asClamped = new Uint8ClampedArray(pixels!);
            const imageData = new ImageData(asClamped, 32, 32);


            const bitmap = await createImageBitmap(imageData, 0, 0, 32, 32)


            const fac = new FastAverageColor();
            fac.getColorAsync(bitmap)
                .then(color => {
                    coverElement?.style.setProperty('--user-color', color.hex);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            coverElement?.style.setProperty('--user-color', HSLtoString(generateHSL(props.profile.name.val != "" ? props.profile.name.val : props.profile.username.val), 20));
        }

        coverElement?.animate([
            {
                opacity: 0
            },
            {
                opacity: 1
            }
        ], 400)
    }    
    setTimeout(() => {
        setCoverColor()
    })

    effect(() => {
        setCoverColor()
    }, [props.profile.avatar])
    

    return (
        <div class="cover">
            {/* {props.profile.cover !== "" && <picture>
                <source srcset={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${props.profile.cover}.webp`} type="image/webp" />
                {
                    is_cached(`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${props.profile.cover}.webp`) ?
                    <img decoding="async" src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${props.profile.cover}.webp`} alt={props.profile.name != "" ? props.profile.name : props.profile.username} />
                    :
                    <img decoding="async" onLoad={showPicture} class="hidden" src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${props.profile.cover}.webp`} alt={props.profile.name != "" ? props.profile.name : props.profile.username} />
                
                }
            </picture>} */}
        </div>
    )
}