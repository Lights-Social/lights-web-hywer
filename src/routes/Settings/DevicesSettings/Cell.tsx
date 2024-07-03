import { store, type Session } from "@/data"
import Duration from "@/ui/Duration"
import DesktopIcon from "@/ui/icons/desktop"
import MobileIcon from "@/ui/icons/mobile"
import { showTerminateSessionFlow } from "./TerminateSessionFlow/TerminateSessionFlow"

interface CellProps {
    session: Session
    isCurrent? : boolean
}

export default function Cell({session, isCurrent}: CellProps) {
    const {strings} = store.locale()

    
    return (
        <>
            <button class="category" onClick={() => {showTerminateSessionFlow(session)}}>
                <div class="option">
                    <div class="title">
                        <div class="sessionIconWrapper">
                            {session.is_mobile ? <MobileIcon /> : <DesktopIcon />}
                        </div>
                        <div class="sessionInfo">
                            <div class="device">
                                {session.device == "" ? strings["unknownDevice"] : session.device} • {session.browser}
                            </div>
                            <div class="geo">
                                {session.last_geo}
                            </div>
                            {
                                !isCurrent ?
                                <div class="geo">
                                    <Duration date={session.last_activity} />
                                </div> :
                                <div class="geo">
                                    <div class="bubble" />
                                    {strings["online"]}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </button>
            <hr />
        </>
    )
}