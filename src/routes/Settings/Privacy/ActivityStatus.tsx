import { store } from "@/data";
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import Arrow from "@/ui/icons/arrow";
import type { Reactive } from "hywer/jsx-runtime";
import ExceptionsMenu from "./ExceptionsMenu";
import PermissionsMenu from "./PermissionsMenu";

interface ActivityStatusProps {
    category: Reactive<string>
}

export default function ActivityStatus({category}: ActivityStatusProps) {

    const {strings} = store.locale()


    return (
        <div class='window'>
            <MobileHeader>
                <span class="title">
                    { strings["activityStatus"] }
                </span>
            </MobileHeader>
            <div class="categoryTitle">
                <span class="previous" onClick={() => category.val = "privacy"}>{ strings["privacyAndSecurity"] }</span>
                <Arrow />
                { strings["activityStatus"] }
            </div>

            <div class="block">
                <span class="blockTitle">
                    { strings["whoCanSeeMyActivityStatus"] }
                </span>
                <PermissionsMenu />
            </div>
            <ExceptionsMenu />
        </div>
    )
}