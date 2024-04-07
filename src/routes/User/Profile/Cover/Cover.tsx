import type { IProfile } from '@/data/types/models';
import { HSLtoString, generateHSL } from '@/ui/utils/HSLgen';
import { FastAverageColor } from 'fast-average-color';


interface CoverProps {
	profile: IProfile
}

export default function Cover(props: CoverProps) {

    function setCoverColor() {
        const coverElement = document.querySelector<HTMLDivElement>('.cover')
        if (props.profile.avatar[0]) {
            let image = new Image();
            image.src = props.profile.avatar[0].preview

            const fac = new FastAverageColor();
            fac.getColorAsync(image)
                .then(color => {
                    coverElement?.style.setProperty('--user-color', color.hex);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            coverElement?.style.setProperty('--user-color', HSLtoString(generateHSL(props.profile.name != "" ? props.profile.name : props.profile.username), 20));
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