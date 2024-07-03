import { ref } from "hywer/jsx-runtime"
import AppearanceSettings from "./AppearanceSettings/AppearanceSettings"
import CategoriesList from "./CategoriesList"
import './styles.css'
import General from "./General"
import Privacy from "./Privacy/Privacy"
import CacheSettings from "./CacheSettings"
import LanguageSettings from "./LanguageSettings/LanguageSettings"
import { store } from "@/data"
import DoNotTranslate from "./TranslateSettings/DoNotTranslate"
import TranslateLanguage from "./TranslateSettings/TranslateLanguage"
import TranslateSettings from "./TranslateSettings/TranslateSettings"
import DeviceSettings from "./DevicesSettings/DevicesSettings"
import ActivityStatus from "./Privacy/ActivityStatus"
import Avatar from "./Privacy/Avatar"

interface SettingsProps {
    category?: string
}

export default function Settings(props: SettingsProps) {
    const category = ref(props.category || "general");

    const {locale} = store.locale()


    return (
        <main class={category.derive((val) => val != "" ? "settingsView selected" : "settingsView")}>
            {
                locale.derive(() => {
                    return <CategoriesList category={category} />
                })
            }
            {
                category.derive((val) => {
                    switch (val) {
                        case "general":
                            return <General category={category} />
                        case "appearance":
                            return <AppearanceSettings />
                        case "privacy":
                            return <Privacy category={category} />
                        case "privacy/activity":
                            return <ActivityStatus category={category} />
                        case "privacy/avatar":
                            return <Avatar category={category} />
                        case "storage":
                            return <CacheSettings />
                        case "language":
                            return <LanguageSettings />
                        case "translating":
                            return <TranslateSettings category={category} />
                        case "translating/exceptions":
                            return <DoNotTranslate category={category} />
                        case "translating/default":
                            return <TranslateLanguage category={category} />
                        case "devices":
                            return <DeviceSettings />

                        default:
                            return <div class="window" />
                    }
                })
            }
        </main>
    )
}