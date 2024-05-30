import type { IMediaAttachment } from "@/data/types/models";
import { ref } from "hywer/jsx-runtime";
import Picture from "../Picture";
import Video from "../Video/Video";

interface ContainerProps {
    onToggleBar: () => void
    mediaItem: IMediaAttachment;
    onVisible: () => void;
    index: number;
    onDownload?: (blob: string, index: number) => void;
    onClose: () => void;
}

export function Container(props: ContainerProps) {


    const startY = ref(0);
    const startOffsetY = ref(0);


    function onTouchStart(e: TouchEvent) {
        const touch = e.touches[0];
        startY.val = touch.clientY;
        //setStartOffsetY(containerRef!.getBoundingClientRect().top);
    }

    function onTouchMove(e: TouchEvent) {
        const touch = e.touches[0];
        const offsetY = touch.clientY - startY.val;
        const newTranslateY = startOffsetY.val + offsetY;
        
        if (newTranslateY > 0 || newTranslateY < 0) { // Разрешить смахивать вверх и вниз
            e.preventDefault();
            //containerRef!.style.transform = `translateY(${newTranslateY}px)`;
        }
    }

    function onTouchEnd(e: TouchEvent) {
        const touch = e.changedTouches[0];
        const offsetY = touch.clientY - startY.val;
        const newTranslateY = startOffsetY.val + offsetY;
        
        if (Math.abs(newTranslateY) > 100) { // Изменено на Math.abs для проверки смахивания как вверх, так и вниз
            //containerRef!.style.transform = `translateY(${newTranslateY > 0 ? '100vh' : '-100vh'})`; // Определить направление смахивания и применить соответствующее значение translateY
            setTimeout(() => props.onClose(), 150);
        } else {
            //containerRef!.style.transform = `translateY(0)`;
        }
    }

    return (
        <div onTouchEnd={onTouchEnd} onTouchStart={onTouchStart} onTouchMove={onTouchMove} class="container" onClick={() => props.onToggleBar()}>
    
            {
                props.mediaItem.type == "photo" ?
                <Picture src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${props.mediaItem.id}.webp`} picture={props.mediaItem} />
                : null
            }
            {
                props.mediaItem.type == "video" ?
                <Video src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/video/${props.mediaItem.id}.mp4`} muted={true} />
                : null
            }
        </div>
    )
}