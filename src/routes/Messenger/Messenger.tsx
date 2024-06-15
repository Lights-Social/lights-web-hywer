import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import { store } from "@/data";
import Chat from "./Chat/Chat";

function Messenger() {
    const {strings} = store.locale()

    return <>
        <MobileHeader>
            <div class="title">{strings["messages"]}</div>
        </MobileHeader>
        <main class="messengerView">
            <Chat />
        </main>
    	
    </>
}

export default Messenger