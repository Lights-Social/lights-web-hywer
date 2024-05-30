import { Show } from "solid-js";
import { useI18n } from "@solid-primitives/i18n";
import { createMediaQuery } from "@solid-primitives/media";
import { MobileHeader } from "../../../components/MobileHeader";

export default function ActivityStatus() {
    const [t] = useI18n();

    const isPhone = createMediaQuery("(max-width: 480px)")

    return (
        <>
            <Show when={isPhone()}>
                <MobileHeader>
                    <span class="title">{t("activityStatus")}</span>
                </MobileHeader>
            </Show>
            <main class='settingsView'>
                <div class='window'>
                    <span class="blockTitle">{t("whoCanSeeMyActivityStatus")}</span>
                </div>
            </main>
        </>
    )
}