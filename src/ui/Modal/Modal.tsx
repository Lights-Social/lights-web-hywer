import { type JSX } from 'hywer/jsx-runtime';
import './styles.css'

interface ModalProps {
    children: JSX.Element;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    id: string;
}

const handleModalClick = (e: MouseEvent) => {
    const dialog = e.target as HTMLDialogElement;
    const modalRect = dialog!.getBoundingClientRect();
  
    if (
        e.clientX < modalRect.left ||
        e.clientX > modalRect.right ||
        e.clientY < modalRect.top ||
        e.clientY > modalRect.bottom
    ) {
        closeModal(dialog.id);
    }
};

function onAnimationEnd(e: AnimationEvent) {
    const dialog = e.target as HTMLDialogElement

    dialog.close()

    dialog.removeEventListener("animationend", onAnimationEnd);

    dialog.classList.remove("hide")

}

export function closeModal(id: string) {
    const dialog = document.querySelector<HTMLDialogElement>('#' + id)

    dialog?.classList.add("hide")

    dialog?.addEventListener("animationend", onAnimationEnd);
    dialog?.removeEventListener("click", handleModalClick);

}

export function openModal(id: string, haptic: boolean, closeByBack: boolean = true) {
    const dialog = document.querySelector<HTMLDialogElement>('#' + id)

    dialog?.showModal()

    if (haptic && navigator.vibrate) navigator.vibrate([7,7,7,7])
      
    closeByBack && dialog?.addEventListener("click", handleModalClick);
}

export function Modal(props: ModalProps) {
    
    return (
        <dialog id={props.id} class="modal" onCancel={(e: Event) => {e.preventDefault(); closeModal(props.id)}}>
            {props.children}
        </dialog>
    )
}