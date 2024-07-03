import { store } from "@/data";
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import { For } from "hywer/x/html";
import Cell from "./Cell";
import { effect, ref } from "hywer/jsx-runtime";
import SearchInput from "@/ui/SearchInput/SearchInput";
import SearchLanguage from "../TranslateSettings/SearchLanguage/SearchLanguage";

export default function LanguageSettings() {
    const {locale} = store.locale()

    const strings = ref(store.locale().strings)


    effect(()=> {
        strings.val = store.locale().strings
    }, [locale])

    const availableLocales = ["en-GB", "en-US", "uk"]

    async function changeLanguage(lang: string) {
        if (!document.startViewTransition) {
            store.setLocale(lang)
            return;
        }

        document.documentElement.classList.add("onboardingEnd");


        const transition: any = document.startViewTransition(() => store.setLocale(lang));

        
        try {
            await transition.finished;
        } finally {
            document.documentElement.classList.remove('onboardingEnd');
        }

    }
    const searchQuery = ref("")

    
    return (
        <div class='window'>
            <MobileHeader>
                <span class="title">
                    { strings.derive(() => strings.val["language"]) }
                </span>
            </MobileHeader>
            <div class="categoryTitle">
                { strings.derive(() => strings.val["language"]) }
            </div>
            <SearchInput id="languageSearchInput" onInput={(text) => searchQuery.val = text} />
            {
                searchQuery.derive((val) => {
                    if (val == "") {
                        return (
                            <>
                                <div class="block">
                                    <div class="categoriesList">
                                        <For in={navigator.languages as string[]}>
                                            {(lang) => {
                                                if (availableLocales.includes(lang)) {
                                                    return <Cell onSelect={changeLanguage} checked={lang == locale.val} type="radio" lang={lang} />
                                                } else {
                                                    return <div style="display: none" />
                                                }
                                            }}
                                        </For>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="categoriesList">
                                        <For in={availableLocales}>
                                            {(lang) => {
                                                if (!navigator.languages.includes(lang)) {
                                                    return <Cell onSelect={changeLanguage} checked={lang == locale.val} type="radio" lang={lang} />
                                                } else {
                                                    return null
                                                }
                                            }}
                                        </For>
                                    </div>
                                </div>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <SearchLanguage checkedPattern={(lang) => locale.val == lang} onSelect={changeLanguage} query={val} type="radio" filter={"interface"} />
                            </>
                        )
                    }
                })
            }
        </div>
    )
}