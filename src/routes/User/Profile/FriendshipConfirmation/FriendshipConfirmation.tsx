import { store } from "@/data";
import "./FriendshipConfirmation.css"
import Checkmark2Icon from "@/ui/icons/checkmark2";


export default function FriendshipConfirmation() {
    const {strings} = store.locale()

    function onAccept() {
        
    }

    function onIgnore() {

    }

    
    return (
        <div class="friendshipConfirmation">
            <h4>{strings["incomingFriendRequest"]}</h4>
            <div class="buttons">
                <button class="accept" onClick={() => onAccept()}>
                    <Checkmark2Icon />
                    {strings["accept"]}
                </button>
                <button onClick={() => onIgnore()}>
                    {strings["ignore"]}
                </button>
            </div>
            
        </div>
    )
}