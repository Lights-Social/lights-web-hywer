import { ref, type JSX } from 'hywer/jsx-runtime';
import './styles.css'
import type { IMediaAttachment } from '@/data/types/models';
import { For } from 'hywer/x/html';
import { Container } from './Container';
import { store } from '@/data';
import BackIcon from '../icons/back';
// import './flow.css'
// import './bar.css'

const mediaArray = ref<IMediaAttachment[]>([])

const handleModalClick = (e: MouseEvent) => {
    const dialog = e.target as HTMLDialogElement;
    const modalRect = dialog!.getBoundingClientRect();
  
    if (
        e.clientX < modalRect.left ||
        e.clientX > modalRect.right ||
        e.clientY < modalRect.top ||
        e.clientY > modalRect.bottom
    ) {
        closeModal();
    }
};

function onAnimationEnd(e: AnimationEvent) {
    const dialog = e.target as HTMLDialogElement

    dialog.close()

    dialog.removeEventListener("animationend", onAnimationEnd);

    dialog.classList.remove("hide")

}

function closeModal() {
    const dialog = document.querySelector<HTMLDialogElement>('.mediaViewer')

    dialog?.classList.add("hide")

    dialog?.addEventListener("animationend", onAnimationEnd);
    dialog?.removeEventListener("click", handleModalClick);

}

export function openMediaViewer(media: IMediaAttachment[], index: number) {
    const dialog = document.querySelector<HTMLDialogElement>('.mediaViewer')

    console.log(media)

    if (mediaArray.val != media) {
        mediaArray.val = media
    }


    dialog?.showModal()
      
}

export function MediaViewer() {
    const currentIndex = ref(0)
    const {strings} = store.locale()


    function onScroll() {
        const container = document.querySelector(`.mediaViewer .container`) as HTMLDivElement
        const pictureWidth = (container.scrollWidth - ((mediaArray.val.length - 1) * 10)) / mediaArray.val.length
      
        const index = container.scrollLeft / (pictureWidth + 10)

        const int = Math.round(index)

        if (int == currentIndex.val) return
        currentIndex.val = int
        
    }
    
    return (
        <dialog style={"--color: black"} class="mediaViewer" onCancel={(e: Event) => {e.preventDefault(); closeModal()}}>
            <div class='bar'>
                <button class='close' onClick={closeModal}>
                    <BackIcon />

                    {strings["back"]}
                </button>

                <div class="title">
                    {currentIndex.derive((val) => val + 1)} {strings["of"]} {mediaArray.derive((val) => val.length)}
                </div>

                {/* <a href={props.media[currentIndex()].url ? props.media[currentIndex()].url : `${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${props.media[currentIndex()].id}.webp`} download={props.media[currentIndex()].id+'.webp'}>
                    save
                </a> */}

                <button class='download'>
                    <svg viewBox="0 0 31 37" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4999 0C14.1192 0 12.9999 1.11929 12.9999 2.5V18.4636L4.6783 10.142C3.70199 9.16574 2.11908 9.16574 1.14277 10.142C0.166458 11.1184 0.166456 12.7013 1.14277 13.6776L13.5034 26.0383L13.5168 26.0517C14.4931 27.028 16.076 27.028 17.0523 26.0517L29.4266 13.6774C30.4029 12.7011 30.4029 11.1182 29.4266 10.1419C28.4503 9.16559 26.8673 9.16559 25.891 10.1419L17.9999 18.033V2.5C17.9999 1.11929 16.8806 0 15.4999 0ZM29.7619 33.6479C29.7687 32.2672 28.655 31.1424 27.2743 31.1355L2.52464 31.0124C1.14395 31.0055 0.0191053 32.1193 0.0122378 33.4999C0.00537022 34.8806 1.11908 36.0055 2.49977 36.0123L27.2495 36.1355C28.6302 36.1423 29.755 35.0286 29.7619 33.6479Z" />
                    </svg>
                </button>
            </div>
                <For in={mediaArray}>
                    {(item, i) => {
                        return <Container onVisible={() => {}} onToggleBar={() => {}} onClose={() => {}} mediaItem={item} index={i} />
                    }}
                </For>
        </dialog>
    )
}