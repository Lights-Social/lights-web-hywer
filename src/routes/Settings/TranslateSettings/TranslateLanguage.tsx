import { store } from "@/data";
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import { For } from "hywer/x/html";
import Cell from "../LanguageSettings/Cell";
import Arrow from "@/ui/icons/arrow";
import { ref, type Reactive } from "hywer/jsx-runtime";
import SearchInput from "@/ui/SearchInput/SearchInput";
import SearchLanguage from "./SearchLanguage/SearchLanguage";

interface TranslateLanguageProps {
    category: Reactive<string>
}

export default function TranslateLanguage({category}: TranslateLanguageProps) {
    const {strings, locale} = store.locale()

    const languages = store.getAvailableLanguages("target")

    const defaultTranslationLanguage = store.getDefaultTranslationLanguage()

    function setDefaultTranslationLanguage(lang: string) {
        store.setDefaultTranslationLanguage(lang)
    }

    const searchQuery = ref("")

    return (
        <div class='window'>
            <MobileHeader>
                <span class="title">
                    { strings["defaultTranslationLanguage"] }
                </span>
            </MobileHeader>
            <div class="categoryTitle">
                <span class="previous" onClick={() => category.val = "translating"}>{ strings["translating"] }</span>
                <Arrow />
                { strings["defaultTranslationLanguage"] }
            </div>
            <SearchInput id="languageSearchInput" onInput={(text) => searchQuery.val = text} />
            {
                searchQuery.derive((val) => {
                    if (val == "") {
                        return (
                            <>
                                {
                                    <div class="block">
                                        <div class="categoriesList">
                                            <Cell onSelect={setDefaultTranslationLanguage} checked={defaultTranslationLanguage.val == "default"} type="radio" lang={"default"} />
                                            {
                                                defaultTranslationLanguage.val != "default" ?
                                                <Cell onSelect={setDefaultTranslationLanguage} checked={true} type="radio" lang={defaultTranslationLanguage.val} /> : null
                                            }
                                        </div>
                                    </div>
                                }

                                <div class="block">
                                    <div class="categoriesList">
                                        <For in={navigator.languages as string[]}>
                                            {(lang) => {

                                                if (languages.includes(lang)) {
                                                    return <Cell onSelect={setDefaultTranslationLanguage} checked={false} type="radio" lang={lang} />
                                                } else {
                                                    return <div style="display: none" />
                                                }
                                            }}
                                        </For>
                                    </div>
                                </div>

                                <div class="block">
                                    <div class="categoriesList">
                                        <For in={languages}>
                                            {(lang) => {

                                                //console.log(canonical[0], defaultTranslationLanguage.val)

                                                if (defaultTranslationLanguage.val == lang || locale.val == lang) {
                                                    return <div style="display: none" />
                                                } else if (navigator.languages.includes(lang)) {
                                                    return <div style="display: none" />
                                                } else {
                                                    return <Cell onSelect={setDefaultTranslationLanguage} checked={false} type="radio" lang={lang} />
                                                }
                                            }}
                                        </For>
                                    </div>
                                </div>
                            </>
                        )
                    } else {
                        return <>
                            <SearchLanguage checkedPattern={(lang) => defaultTranslationLanguage.val == lang} onSelect={setDefaultTranslationLanguage} query={val} type="radio" filter={"target"} />
                        </>
                    }
                })
            }
        </div>
    )
}