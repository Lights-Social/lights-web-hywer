import { store } from "@/data";
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import Arrow from "@/ui/icons/arrow";
import type { Reactive } from "hywer/jsx-runtime";
import ExceptionsMenu from "./ExceptionsMenu";
import PermissionsMenu from "./PermissionsMenu";

interface AvatarProps {
    category: Reactive<string>
}

export default function Avatar({category}: AvatarProps) {

    const {strings} = store.locale()


    return (
        <div class='window'>
            <MobileHeader>
                <span class="title">
                    { strings["avatar"] }
                </span>
            </MobileHeader>
            <div class="categoryTitle">
                <span class="previous" onClick={() => category.val = "privacy"}>{ strings["privacyAndSecurity"] }</span>
                <Arrow />
                { strings["avatar"] }
            </div>

            
            <div class="block">
                <span class="blockTitle">
                    { strings["whoCanSeeMyAvatar"] }
                </span>
                <PermissionsMenu />
            </div>
            <ExceptionsMenu />
        </div>
    )
}