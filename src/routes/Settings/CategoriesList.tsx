import { store } from "@/data"
import AppearanceIcon from "@/ui/icons/appearance"
import ArrowIcon from "@/ui/icons/arrow"
import LanguageIcon from "@/ui/icons/language"
import NotificationsIcon from "@/ui/icons/notifications"
import PrivateIcon from "@/ui/icons/private"
import SettingsIcon from "@/ui/icons/settings"
import StorageIcon from "@/ui/icons/storage"
import type { Reactive } from "hywer/jsx-runtime"

interface CategoriesListProps {
    category: Reactive<string>
}

export default function CategoriesList({category}: CategoriesListProps) {
    const {strings} = store.locale()

    function selectCategory(name: string) {
        category.val = name
    }

    return (
        <div class="categoriesList">
            <button class={category.derive((val) => val == "general" ? "category selected" : "category")} onClick={() => selectCategory("general")}>
                <div class="title">
                    <SettingsIcon />

                    {strings["general"]}
                </div>
                <div class="subTitle">
                    <ArrowIcon />
                </div>
            </button>
            <button class={category.derive((val) => val == "privacy" ? "category selected" : "category")} onClick={() => selectCategory("privacy")}>
                <div class="title">
                    <PrivateIcon />
                    {strings["privacyAndSecurity"]}
                </div>
                <div class="subTitle">
                    <ArrowIcon />
                </div>
            </button>
            <button class={category.derive((val) => val == "appearance" ? "category selected" : "category")} onClick={() => selectCategory("appearance")}>
                <div class="title">
                    <AppearanceIcon />

                    {strings["appearance"]}
                </div>
                <div class="subTitle">
                    <ArrowIcon />
                </div>

            </button>
            <button class={category.derive((val) => val == "notifications" ? "category selected" : "category")} onClick={() => selectCategory("notifications")}>
                <div class="title">
                    <NotificationsIcon />
                    {strings["notifications"]}
                </div>
                <div class="subTitle">
                    <ArrowIcon />
                </div>
            </button>
            <button class={category.derive((val) => val == "storage" ? "category selected" : "category")} onClick={() => selectCategory("storage")}>
                <div class="title">
                    <StorageIcon />
                    {strings["dataAndStorage"]}
                </div>
                <div class="subTitle">
                    <ArrowIcon />
                </div>
            </button>
            <button class={category.derive((val) => val == "language" ? "category selected" : "category")} onClick={() => selectCategory("language")}>
                <div class="title">
                    <LanguageIcon />

                    {strings["language"]}
                </div>
                <div class="subTitle">
                    <ArrowIcon />
                </div>
            </button>
        </div>
    )
}