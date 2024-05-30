import { store } from "@/data"
import { ref } from "hywer/jsx-runtime"
import AppearanceSettings from "./AppearanceSettings/AppearanceSettings"
import CategoriesList from "./CategoriesList"
import './styles.css'
import General from "./General"
import Privacy from "./Privacy"
import CacheSettings from "./CacheSettings"

interface SettingsProps {
    category?: string
}

export default function Settings(props: SettingsProps) {
    const category = ref(props.category || "general");

    return (
        <>
            <main class='settingsView'>
                <CategoriesList category={category} />

                <div class='window'>
                    {
                        category.derive((val) => {
                            switch (val) {
                                case "general":
                                    return <General />
                                case "appearance":
                                    return <AppearanceSettings />
                                case "privacy":
                                    return <Privacy />
                                case "storage":
                                    return <CacheSettings />
                                case "language":
                                    return <CacheSettings />
                                default:
                                    break;
                            }
                        })
                    }
                </div>
            </main>

        </>
    )
}