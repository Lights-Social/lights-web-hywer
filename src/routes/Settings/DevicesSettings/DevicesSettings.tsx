import { store } from "@/data";
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import { For } from "hywer/x/html";
import Cell from "./Cell";
import './styles.css'
import TerminateSessionFlow from "./TerminateSessionFlow/TerminateSessionFlow";
import ForbiddenIcon from "@/ui/icons/forbidden";
import { Modal, closeModal, openModal } from "@/ui/Modal/Modal";
import getDifferenceBetweenDates from "@/ui/utils/getDifferenceBetweenDates";

export default function DeviceSettings() {
    const {strings} = store.locale()


    const {currentSession, sessions} = store.getSessions()

    function terminateAllSessions() {
        const currentSessionDate = sessions.val.find((session) => session.session_id == currentSession)?.createdate

        if (getDifferenceBetweenDates(Date.now(), currentSessionDate!).hours < 24) {
            closeModal("terminateAllSessionsConfirmModal")
            openModal("forbiddenSessionModal", [7,7,7,7], false)
            return
        }
        closeModal("terminateAllSessionsConfirmModal")

        store.terminateAllSessions()
    }

    
    return (
        <div class='window'>
            <MobileHeader>
                <span class="title">
                    { strings["devices"] }
                </span>
            </MobileHeader>
            <div class="categoryTitle">
                { strings["devices"] }
            </div>

            <div class="block">
                <div class="blockDescription">{ strings["devicesDescription"] }</div>
            </div>
            
            <div class="block">

                <div class="blockTitle">{ strings["currentSession"] }</div>
                <div class="categoriesList">
                    <Cell isCurrent={true} session={sessions.val.find((session) => session.session_id == currentSession)!} />
                    {
                        sessions.derive((val) => {
                            if (val.length > 1) {
                                return <>
                                    <button class="category reset" onClick={() => openModal("terminateAllSessionsConfirmModal", [7,7,7,7], false)}>
                                        <div class="option ">
                                            <div class="title">
                                                <ForbiddenIcon />
                                                { strings["terminateAllOtherSessions"] }
                                            </div>
                                        </div>
                                    </button>
                                    <hr />
                                </>
                            } else {
                                return <></>
                            }
                        })

                    }
                </div>
            </div>
            {
                sessions.derive((val) => {
                    if (val.length > 1) {
                        return (
                            <div class="block">
                                <div class="blockTitle">{ strings["otherSessions"] }</div>
                                <div class="categoriesList">
                                    <For in={sessions}>
                                        {(session) => {
                                            if (session.session_id != currentSession) {
                                                return <Cell session={session} />
                                            } else {
                                                return <div style="display: none" />
                                            }
                                        }}
                                    </For>
                                </div>
                            </div>
                        )
                    } else {
                        return <div style="display: none" />
                    }
                })
            }
            <TerminateSessionFlow />
            <Modal type="modal" id="terminateAllSessionsConfirmModal">
                <h1>{strings["terminateOtherSessions"]} 🔌</h1>
                <p>
                    {strings["terminateAllSessionsDescription"]}
                </p>
                <div class="buttons">
                    <button class="reset" onClick={terminateAllSessions}>{strings["terminate"]}</button>
                    <button onClick={() => closeModal("terminateAllSessionsConfirmModal")}>{strings["cancel"]}</button>
                </div>
            </Modal>
        </div>
    )
}