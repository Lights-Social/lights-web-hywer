import { store } from "@/data"
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader"
import { openModal } from "@/ui/Modal/Modal"
import Switcher from "@/ui/Switcher"
import ArrowIcon from "@/ui/icons/arrow"
import type { Reactive } from "hywer/jsx-runtime"
import ResetModal from "./ResetModal"
import getNativeLanguageName from "@/ui/utils/getNativeLanguageName"

interface TranslateSettingsProps {
    category: Reactive<string>
}


export default function TranslateSettings({category}: TranslateSettingsProps) {
    const {strings} = store.locale()

    const doNotTranslateLanguages = store.getDoNotTranslateLanguages()
    const defaultTranslationLanguage = store.getDefaultTranslationLanguage()

    function click(e: Event) {
        e.stopPropagation()
        const checkbox = document.getElementById("showTranslateButtonSwitcher") as HTMLInputElement
        checkbox.click()
    }

    return (
        <div class='window'>
            <MobileHeader>
                <span class="title">
                    { strings["translating"] }
                </span>
            </MobileHeader>
            <div class="categoryTitle">
                { strings["translating"] }
            </div>
            <div class="block">
                <div class="categoriesList">
                    <button class="category">
                        <div onClick={click} class="option">
                            <div class="title">
                                { strings["showTranslateButton"] }
                            </div>
                            <div class="subTitle">
                                <Switcher checked={true} onDisable={() => {}} onEnable={() => {}} id="showTranslateButtonSwitcher" />
                            </div>
                        </div>
                    </button>
                    <hr />
                    <button class="category">
                        <div onClick={() => category.val = "translating/exceptions"} class="option">
                            <div class="title">
                                { strings["doNotTranslate"] }
                            </div>
                            <div class="subTitle">
                                { doNotTranslateLanguages.length }
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                    <button class="category">
                        <div onClick={() => category.val = "translating/default"} class="option">
                            <div class="title">
                                { strings["defaultTranslationLanguage"] }
                            </div>
                            <div class="subTitle">
                                
                                {defaultTranslationLanguage.val == "default" ? strings["default"] : getNativeLanguageName(defaultTranslationLanguage.val)}
                                
                                <ArrowIcon />
                            </div>
                        </div>
                    </button>
                    <hr />
                </div>
                <span class="blockDescription">
                    { strings["translatingDescription"] }
                </span>
            </div>
            <div class="block">
                <div class="categoriesList">
                    <button class="category reset" onClick={() => openModal("resetTranslationSettingsModal", [7,7,7,7], false)}>
                        <div class="option">
                            { strings["resetTranslationSettings"] }
                        </div>
                    </button>
                </div>
            </div>
            <ResetModal />
        </div>
    )
}