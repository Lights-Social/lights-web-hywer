import type { IPhotoAttachment } from "@/data/types/models"
import Picture from "@/ui/Picture"
import "./styles.css"
import random_id from "@/ui/utils/random_id"
import { ref } from "hywer/jsx-runtime"

interface CarouselProps {
    pictures: IPhotoAttachment[]
}

export default function Carousel({pictures}: CarouselProps) {
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
        const pictureWidth = (container.scrollWidth - ((pictures.length - 1) * 10)) / pictures.length
      
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
        const pictureWidth = (container.scrollWidth - ((pictures.length - 1) * 10)) / pictures.length

        const scrollPosition = currentIndex.val * pictureWidth
        container.scrollTo(scrollPosition, 0)

    }


    return (
        <div class="carouselPictures" id={id}>
            <div class="counter">
                {currentIndex.derive(index => index + 1)}/{pictures.length}
            </div>
            <div onScroll={onScroll} class="container">
                {
                    pictures.map((picture) => <Picture picture={picture} />)
                }
            </div>
            <div class="points">
                {pictures.map((picture, index) => {
                    return <button onClick={() => changePicture(index)} class={`point ${index == currentIndex.val ? "selected" : ""}`}>
                        <Picture picture={picture} />
                    </button> 
                })}
            </div>
        </div>
    )
}