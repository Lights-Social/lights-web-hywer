import { store } from "@/data";
import EverybodyIcon from "@/ui/icons/everybody";
import FriendsIcon from "@/ui/icons/friends";
import PrivateIcon from "@/ui/icons/private";
import Radio from "@/ui/Radio";


export default function PermissionsMenu() {
    const {strings} = store.locale()


    function click(e: Event, id: string) {
        e.stopPropagation()
        const checkbox = document.getElementById(id) as HTMLInputElement
        checkbox.click()
    }
    
    return (
        <div class="categoriesList">
            <button class="category">
                <div onClick={(e: Event) => click(e, "everybody_option")} class="option">
                    <div class="title">
                        <EverybodyIcon />
                        { strings["everybody"] }
                    </div>
                    <div class="subTitle">
                        <Radio name="activityStatus" checked={true} onDisable={() => {}} onEnable={() => {}} id={"everybody_option"} />
                    </div>
                </div>
            </button>
            <hr />
            <button class="category">
                <div onClick={(e: Event) => click(e, "friends_option")} class="option">
                    <div class="title">
                        <FriendsIcon />
                        { strings["friends"] }
                    </div>
                    <div class="subTitle">
                        <Radio name="activityStatus" checked={false} onDisable={() => {}} onEnable={() => {}} id={"friends_option"} />
                    </div>
                </div>
            </button>
            <hr />
            <button class="category">
                <div onClick={(e: Event) => click(e, "nobody_option")} class="option">
                    <div class="title">
                        <PrivateIcon />
                        { strings["nobody"] }
                    </div>
                    <div class="subTitle">
                        <Radio name="activityStatus" checked={false} onDisable={() => {}} onEnable={() => {}} id={"nobody_option"} />
                    </div>
                </div>
            </button>
            <hr />
        </div>
    )
}