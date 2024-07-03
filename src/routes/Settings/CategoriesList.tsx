import { store } from "@/data"
import AppearanceIcon from "@/ui/icons/appearance"
import ArrowIcon from "@/ui/icons/arrow"
import LanguageIcon from "@/ui/icons/language"
import WorldwideIcon from "@/ui/icons/worldwide"
import NotificationsIcon from "@/ui/icons/notifications"
import PrivateIcon from "@/ui/icons/private"
import SettingsIcon from "@/ui/icons/settings"
import StorageIcon from "@/ui/icons/storage"
import capitalizeFirstLetter from "@/ui/utils/capitalizeFirstLetter"
import { ref, type Reactive } from "hywer/jsx-runtime"
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader"
import SearchInput from "@/ui/SearchInput/SearchInput"
import Devices from "@/ui/icons/devices"

interface CategoriesListProps {
    category: Reactive<string>
}

export default function CategoriesList({category}: CategoriesListProps) {
    const {strings, locale} = store.locale()

    function selectCategory(name: string) {
        category.val = name
    }

    const languageNames = new Intl.DisplayNames(locale.val, {
        type: "language",
        style: "short",
        languageDisplay: "standard"
    });

    const searchQuery = ref("")

    return (
        <>
            <MobileHeader>
                <span class="title">
                    { strings["settings"] }
                </span>
            </MobileHeader>
            <div class="settingsSidebar">
                <div class="categoryTitle">{strings["settings"]}</div>
                <SearchInput id="settingsSearchInput" onInput={(text) => searchQuery.val = text} />
                <div class="categoriesList">
                    <button class={category.derive((val) => val == "general" ? "category selected" : "category")}>
                        <div onClick={() => selectCategory("general")} class="option">
                            <div class="title">
                                <SettingsIcon />

                                {strings["general"]}
                            </div>
                            <div class="subTitle">
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                    <button class={category.derive((val) => val == "privacy" ? "category selected" : "category")}>
                        <div onClick={() => selectCategory("privacy")} class="option">
                            <div class="title">
                                <PrivateIcon />
                                {strings["privacyAndSecurity"]}
                            </div>
                            <div class="subTitle">
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                    <button class={category.derive((val) => val == "appearance" ? "category selected" : "category")}>
                        <div onClick={() => selectCategory("appearance")} class="option">
                            <div class="title">
                                <AppearanceIcon />
                                {strings["appearance"]}
                            </div>
                            <div class="subTitle">
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                    <button class={category.derive((val) => val == "notifications" ? "category selected" : "category")}>
                        <div onClick={() => selectCategory("notifications")} class="option">
                            <div class="title">
                                <NotificationsIcon />
                                {strings["notifications"]}
                            </div>
                            <div class="subTitle">
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                    <button class={category.derive((val) => val == "storage" ? "category selected" : "category")}>
                        <div onClick={() => selectCategory("storage")} class="option">
                            <div class="title">
                                <StorageIcon />
                                {strings["dataAndStorage"]}
                            </div>
                            <div class="subTitle">
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                    <button class={category.derive((val) => val == "devices" ? "category selected" : "category")}>
                        <div onClick={() => selectCategory("devices")} class="option">
                            <div class="title">
                                <Devices />
                                {strings["devices"]}
                            </div>
                            <div class="subTitle">
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                </div>

                <div class="categoriesList">
                    <button class={category.derive((val) => val == "language" ? "category selected" : "category")}>
                        <div onClick={() => selectCategory("language")} class="option">
                            <div class="title">
                                <WorldwideIcon />
                                {strings["language"]}
                            </div>
                            <div class="subTitle">
                                {capitalizeFirstLetter(languageNames.of(locale.val)!)}
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                    <button class={category.derive((val) => val == "translating" ? "category selected" : "category")}>
                        <div onClick={() => selectCategory("translating")} class="option">
                            <div class="title">
                                <LanguageIcon />
                                {strings["translating"]}
                            </div>
                            <div class="subTitle">
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                </div>
            </div>
        </>
    )
}