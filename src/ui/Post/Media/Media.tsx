import type { IMediaAttachment } from "@/data/types/models"
import Picture from "@/ui/Picture/index"
import "./singlePicture.css"
import "./twoPictures.css"
import Carousel from "./Carousel/Carousel"
import Video from "@/ui/Video/Video"
import { openMediaViewer } from "@/ui/MediaViewer/MediaViewer"


interface MediaProps {
    media: IMediaAttachment[]
}

export default function Media({media}: MediaProps) {

    return (
        <>
            {
                media.length == 1 ?
                <div onClick={() => openMediaViewer(media, 0)} class={"singlePicture"}>
                    {
                        media[0].type == "photo" ?
                        <Picture src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${media[0].id}.webp`} picture={media[0]} />
                        : null
                    }
                    {
                        media[0].type == "video" ?
                        <Video src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/video/${media[0].id}.mp4`} muted={true} />
                        : null
                    }
                </div> : null
            }
            {
                media.length == 2 ?
                <div class={"twoPictures"}>
                    {
                        media[0].type == "photo" ?
                            <Picture onClick={() => openMediaViewer(media, 0)} src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${media[0].id}.webp`} picture={media[0]} />
                        : null
                    }
                    {
                        media[0].type == "video" ?
                        <Video onClick={() => openMediaViewer(media, 0)} src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/video/${media[0].id}.mp4`} muted={true} />
                        : null
                    }
                    {
                        media[1].type == "photo" ?
                        <Picture onClick={() => openMediaViewer(media, 1)} src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${media[1].id}.webp`} picture={media[1]} />
                        : null
                    }
                    {
                        media[1].type == "video" ?
                        <Video onClick={() => openMediaViewer(media, 1)} src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/video/${media[1].id}.mp4`} muted={true} />
                        : null
                    }
                </div> : null
            }
            {
                media.length > 2 ? <Carousel media={media} /> : null
            }
        </>
    )
}