import type { IMediaAttachment } from "@/data/types/models"
import Picture from "@/ui/Picture"
import "./styles.css"
import random_id from "@/ui/utils/random_id"
import { ref } from "hywer/jsx-runtime"
import { For } from "hywer/x/html"
import Video from "@/ui/Video/Video"

interface CarouselProps {
    media: IMediaAttachment[]
}

export default function Carousel({media}: CarouselProps) {
    const currentIndex = ref(0)
    const id = random_id()

    function changeButtons() {
        const buttons = document.querySelectorAll<HTMLButtonElement>(`#${id} .points button`)

        buttons.forEach((button, i) => {
            if (i == currentIndex.val) {
                button.classList.add("selected")
            } else {
                button.classList.remove("selected")
            }
        })

    }

    function onScroll() {
        const container = document.querySelector(`#${id} .container`) as HTMLDivElement
        const pictureWidth = (container.scrollWidth - ((media.length - 1) * 10)) / media.length
      
        const index = container.scrollLeft / (pictureWidth + 10)

        const int = Math.round(index)

        if (int == currentIndex.val) return
        currentIndex.val = int
        
        changeButtons()
    }

    function changePicture(index: number) {
        if (index == currentIndex.val) return
        currentIndex.val = index
        changeButtons()

        const container = document.querySelector(`#${id} .container`) as HTMLDivElement
        const pictureWidth = (container.scrollWidth - ((media.length - 1) * 10)) / media.length

        const scrollPosition = currentIndex.val * pictureWidth
        container.scrollTo(scrollPosition, 0)

    }


    return (
        <div class="carouselPictures" id={id}>
            <div class="counter">
                {currentIndex.derive(index => index + 1)}/{media.length}
            </div>
            <div onScroll={onScroll} class="container">
                <For in={media}>
                    {(item) => {
                        if (item.type == "photo") {
                            return <Picture src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${item.id}.webp`} picture={item} />
                        } else if (item.type == "video") {
                            return <Video src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/video/${item.id}.mp4`} muted={true} />
                        }
                    }}
                </For>
            </div>
            <div class="points">
                <For in={media}>
                    {(item, index) => {
                        return <button onClick={() => changePicture(index)} class={`point ${index == currentIndex.val ? "selected" : ""}`}>
                            {
                                item.type == "photo" ?
                                    <Picture src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${item.id}.webp`} picture={item} />
                                : null
                            }
                            {
                                item.type == "video" ?
                                    <div></div>
                                : null
                            }
                        </button>
                    }}
                </For>
            </div>
        </div>
    )
}