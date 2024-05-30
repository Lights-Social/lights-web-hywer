import { type JSX } from 'hywer/jsx-runtime';
import './styles.css'
import './flow.css'
import './bar.css'

interface ModalProps {
    children: JSX.Element[];
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    id: string;
    type: string;
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

export function openModal(id: string, haptic: number[], closeByBack: boolean = true) {
    const dialog = document.querySelector<HTMLDialogElement>('#' + id)

    dialog?.showModal()

    if (haptic.length > 0 && navigator.vibrate) navigator.vibrate(haptic)
      
    closeByBack && dialog?.addEventListener("click", handleModalClick);
}

export function Modal(props: ModalProps) {
    
    return (
        <dialog id={props.id} class={"modal"+(props.type == "flow" ? " "+props.type : "")+(props.type == "flowFull" ? " flow full" : "")} onCancel={(e: Event) => {e.preventDefault(); closeModal(props.id)}}>
            {props.children}
        </dialog>
    )
}