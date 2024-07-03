import { store } from "@/data";
import { Modal, closeModal } from "@/ui/Modal/Modal";

export default function ResetModal() {
    const {strings} = store.locale()

    return (
        <Modal type="modal" id="resetTranslationSettingsModal">
            <h1>{strings["resetTranslationSettings"]} 🔄</h1>
            <p>
                {strings["resetTranslationSettingsDescription"]}
            </p>
            <div class="buttons">
                <button class="reset" onClick={() => closeModal("resetTranslationSettingsModal")}>{strings["reset"]}</button>
                <button onClick={() => closeModal("resetTranslationSettingsModal")}>{strings["cancel"]}</button>

            </div>
        </Modal>
    )
}