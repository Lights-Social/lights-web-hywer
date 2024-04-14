import type { IPhotoAttachment } from "@/data/types/models"
import Picture from "@/ui/Picture/index"
import "./singlePicture.css"
import "./twoPictures.css"
import Carousel from "./Carousel/Carousel"


interface PicturesProps {
    pictures: IPhotoAttachment[]
}

export default function Pictures({pictures}: PicturesProps) {

    return (
        <>
            {
                pictures.length == 1 ?
                <div class={"singlePicture"}>
                    <Picture picture={pictures[0]} />
                </div> : null
            }
            {
                pictures.length == 2 ?
                <div class={"twoPictures"}>
                    <Picture picture={pictures[0]} />
                    <Picture picture={pictures[1]} />
                </div> : null
            }
            {
                pictures.length > 2 ? <Carousel pictures={pictures} /> : null
            }
        </>
    )
}