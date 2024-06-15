import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import { store } from "@/data";
import MessageEditor from "./MessageEditor/MessageEditor";
import './styles.css'

function Chat() {
    const {strings} = store.locale()

    // setTimeout(() => {
    //     navigator.virtualKeyboard.show();
    // }, 5000)

    return <>
        <MobileHeader>
            <div class="title">Test user</div>
        </MobileHeader>
        <div class="window chat">
            <div class="messages">
                <div class="message">
                    test message
                </div>
            </div>
        </div>
        <MessageEditor />
    </>
}

export default Chat