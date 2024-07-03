import './styles.css'

import { store, type Session } from '@/data';
import { ref } from 'hywer/jsx-runtime';
import { Modal, closeModal, openModal } from '@/ui/Modal/Modal';
import getDifferenceBetweenDates from '@/ui/utils/getDifferenceBetweenDates';
import MapIcon from '@/ui/icons/map';
import Duration from '@/ui/Duration';
import DateIcon from '@/ui/icons/date';

import DesktopIcon from "@/ui/icons/desktop"
import MobileIcon from "@/ui/icons/mobile"
import Worldwide from '@/ui/icons/worldwide';
import Switcher from '@/ui/Switcher';
import CallIcon from '@/ui/icons/call';

const item = ref<Session | undefined>(undefined)


export default function TerminateSessionFlow() {
    const {strings} = store.locale()

    const {sessions, currentSession} = store.getSessions()

    function terminateSession() {
        const currentSessionDate = sessions.val.find((session) => session.session_id == currentSession)?.createdate

        if (getDifferenceBetweenDates(Date.now(), currentSessionDate!).hours < 24) {
            if (getDifferenceBetweenDates(item.val!.createdate, currentSessionDate!).ms < 0) {
                closeModal("terminateSessionConfirmModal")
                openModal("forbiddenSessionModal", [7,7,7,7], false)
                return
            }
        }
        closeModal("terminateSessionConfirmModal")
        closeModal("terminateSessionFlow")

        store.terminateSession(item.val!.session_id)
    }

    function click(e: Event) {
        e.stopPropagation()
        const checkbox = document.getElementById("useForCallsSwitcher") as HTMLInputElement
        checkbox.click()
    }

    function enableCalls() {
        store.sessionToggleCalls(item.val!.session_id, true)
    }

    function disableCalls() {
        store.sessionToggleCalls(item.val!.session_id, false)
    }


    return (
        <>
            <Modal type="flow" id="terminateSessionFlow">
                <div class='bar'>
                    <div class="title">
                        {strings["session"]}
                    </div>
                </div>
                <>
                    {
                        item.derive((val) => {
                            if (val) {
                                return (
                                    <div class="terminateSessionFlow">
                                        <div class="preview">
                                            <div class="sessionIconWrapper">
                                                {val?.is_mobile ? <MobileIcon /> : <DesktopIcon />}
                                            </div>
                                            <div class="device">
                                                {val?.device == "" ? strings["unknownDevice"] : val?.device}
                                            </div>
                                        </div>
                                        <div class="categoriesList">
                                            <div class="category">
                                                <div class="option">
                                                    <div class="title">
                                                        <MapIcon />
                                                        {val?.last_geo}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="category">
                                                <div class="option">
                                                    <div class="title">
                                                        <DateIcon />
                                                        {
                                                            currentSession != val?.session_id ?
                                                                <Duration date={val!.last_activity} />
                                                            :
                                                            <div class="date">
                                                                <div class="bubble" />
                                                                {strings["online"]}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="category">
                                                <div class="option">
                                                    <div class="title">
                                                        <Worldwide />
                                                        {val?.browser}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>


                                        <div class="categoriesList">
                                            <button class="category" onClick={() => {}}>
                                                <div onClick={click} class="option">
                                                    <div class="title">
                                                        <CallIcon />
                                                        { strings["incomingCalls"] }
                                                    </div>
                                                    <div class="subTitle">
                                                        <Switcher checked={val.calls} onDisable={disableCalls} onEnable={enableCalls} id="useForCallsSwitcher" />
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return <div style="display: none" />
                            }
                        })
                    }
                </>
                <div class="buttons">
                    {
                        item.derive((val) => {
                            if (currentSession != val?.session_id) {
                                return <button class="reset" onClick={() => openModal("terminateSessionConfirmModal", [7,7,7,7], false)}>{strings["terminateSession"]}</button>
                            } else {
                                return <div style="display: none" />
                            }
                        })
                    }
                    <button onClick={() => {closeModal("terminateSessionFlow")}}>{strings["close"]}</button>
                </div>
            </Modal>
            <Modal type="modal" id="terminateSessionConfirmModal">
                <h1>{strings["terminateSession"]} 🔌</h1>
                <p>
                    {strings["terminateSessionDescription"]}
                </p>
                <div class="buttons">
                    <button class="reset" onClick={terminateSession}>{strings["terminate"]}</button>
                    <button onClick={() => closeModal("terminateSessionConfirmModal")}>{strings["cancel"]}</button>
                </div>
            </Modal>
            <Modal type="modal" id="forbiddenSessionModal">
                <h1>{strings["notSoFast"]} ⚠️</h1>
                <p>
                    {strings["forbiddenSessionDescription"]}
                </p>
                <div class="buttons">
                    <button class="accent" onClick={() => closeModal("forbiddenSessionModal")}>OK</button>
                </div>
            </Modal>
        </>
    )
}

export function showTerminateSessionFlow(session: Session) {

    item.val = session
    
    openModal("terminateSessionFlow", [1], true)
}