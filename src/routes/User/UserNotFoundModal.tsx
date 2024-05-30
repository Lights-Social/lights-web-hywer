import { store } from "@/data"
import { Modal, closeModal, openModal } from "@/ui/Modal/Modal"
import { ref } from "hywer/jsx-runtime"

const usernameItem = ref("")


export default function UserNotFoundModal() {

    const {strings} = store.locale()

    return (
        <Modal type="modal" id="userNotFoundModal">
            <h1>{strings["oops"]} 😕</h1>
            <p>
                {strings["userNotFound1"]} <b>@{usernameItem.derive((val) => decodeURI(val))}</b> {strings["userNotFound2"]}
            </p>
            <div class="buttons">
                <button class="accent" onClick={() => {closeModal("userNotFoundModal")}}>OK</button>
            </div>
        </Modal>
    )
}

export function showUserNotFoundModal(username: string) {

    usernameItem.val = username
    
    openModal("userNotFoundModal", [], false)
}