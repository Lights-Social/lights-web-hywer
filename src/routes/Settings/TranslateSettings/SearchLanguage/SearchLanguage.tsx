import { store } from "@/data";
import { For } from "hywer/x/html";
import Cell from "../../LanguageSettings/Cell";

interface SearchLanguage {
    type: string;
    query: string;
    onRemove?: (lang: string) => void;
    onSelect: (lang: string) => void;
    filter: string;
    checkedPattern: (lang: string) => boolean
}

export default function SearchLanguage({type, query, onRemove, onSelect, filter, checkedPattern}: SearchLanguage) {
    const results = store.searchLanguages(query, filter)

    const {strings} = store.locale()

    return (
        <>
            <div class="categoriesList">
                <For in={results}>
                    {(lang) => {
                        const checked = checkedPattern(lang);

                        return <Cell onRemove={onRemove} onSelect={onSelect} checked={checked} type={type} lang={lang} />
                    }}
                </For>
            </div>
            {
                results.length == 0 ?
                <div class="noResults">
                    { strings["noResults"] }
                </div> : <div style="display: none" />
            }
        </>
    )
}