import { store } from "@/data";
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import { For } from "hywer/x/html";
import Cell from "../LanguageSettings/Cell";
import Arrow from "@/ui/icons/arrow";
import { ref, type Reactive } from "hywer/jsx-runtime";
import SearchInput from "@/ui/SearchInput/SearchInput";
import SearchLanguage from "./SearchLanguage/SearchLanguage";

interface DoNotTranslateProps {
    category: Reactive<string>
}

export default function DoNotTranslate({category}: DoNotTranslateProps) {
    const {strings} = store.locale()

    const languages = store.getAvailableLanguages("source")

    const doNotTranslateLanguages = store.getDoNotTranslateLanguages()

    function removeDoNotTranslateLanguage(lang: string) {
        store.removeDoNotTranslateLanguage(lang)
    }

    function addDoNotTranslateLanguage(lang: string) {
        store.addDoNotTranslateLanguage(lang)
    }

    const searchQuery = ref("")

    
    return (
        <div class='window'>
            <MobileHeader>
                <span class="title">
                    { strings["doNotTranslate"] }
                </span>
            </MobileHeader>
            <div class="categoryTitle">
                <span class="previous" onClick={() => category.val = "translating"}>{ strings["translating"] }</span>
                <Arrow />
                { strings["doNotTranslate"] }
            </div>

            <SearchInput id="languageSearchInput" onInput={(text) => searchQuery.val = text} />
            {
                searchQuery.derive((val) => {
                    if (val == "") {
                        return (
                            <>
                                {
                                    doNotTranslateLanguages.length > 0 ?
                                    <div class="block">
                                        <div class="categoriesList">
                                            <For in={doNotTranslateLanguages}>
                                                {(lang) => {
                                                    return <Cell onRemove={removeDoNotTranslateLanguage} onSelect={addDoNotTranslateLanguage} checked={true} type="checkbox" lang={lang} />
                                                }}
                                            </For>

                                            
                                        </div>
                                    </div> : <div style="display: none" />
                                }

                                <div class="block">
                                    <div class="categoriesList">
                                        <For in={languages}>
                                            {(lang) => {

                                                if (doNotTranslateLanguages.includes(lang)) {
                                                    return <div style="display: none" />
                                                } else {
                                                    return <Cell onRemove={removeDoNotTranslateLanguage} onSelect={addDoNotTranslateLanguage} checked={false} type="checkbox" lang={lang} />
                                                }
                                            }}
                                        </For>
                                    </div>
                                </div>
                            </>
                        )
                    } else {
                        return <>
                            <SearchLanguage checkedPattern={(lang) => doNotTranslateLanguages.includes(lang)} onRemove={removeDoNotTranslateLanguage} onSelect={addDoNotTranslateLanguage} query={val} type="checkbox" filter={"source"} />
                        </>
                    }
                })
            }
        </div>
    )
}