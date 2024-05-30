import { useI18n } from "@solid-primitives/i18n";
import { createEffect, createSignal } from "solid-js";
export default function AutomaticMediaDownloadSettings() {
    const [t] = useI18n();


    const [enabled, setEnabled] = createSignal(true);


    createEffect(() => {
        const option = localStorage.getItem("preventAutomaticMediaDownload")


        if (option === "true") {
            setEnabled(false)
        }
    })

    function toggle() {
        localStorage.setItem("preventAutomaticMediaDownload", ''+enabled());
    }

    return (
        <div class="optionWrapper">
            <span>
                {t("automaticMediaDownload")}
            </span>
            <label class="switch">
                <input id="automaticMediaDownloadSwitcher" onClick={() => {navigator.vibrate && navigator.vibrate(4); toggle()}} type="checkbox" checked={enabled()} />
                <span class="slider" />
            </label>
        </div>
    )
}