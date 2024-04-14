import { store } from "@/data"
import { Modal, closeModal } from "./Modal/Modal"

export default function MapErrorModal() {

    const {strings} = store.locale()

    return (
        <Modal id="mapErrorModal">
            <h1>{strings["mapIsNotAvailable"]} 😅</h1>
            <p>
                {strings["tryAgainLater"]}
            </p>
            <div class="buttons">
                <button class="close" onClick={() => {closeModal("mapErrorModal")}}>OK</button>
            </div>
        </Modal>
    )
}