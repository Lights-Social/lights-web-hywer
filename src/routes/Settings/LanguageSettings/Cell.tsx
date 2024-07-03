import { store } from "@/data";
import Checkbox from "@/ui/Checkbox";
import Radio from "@/ui/Radio";
import capitalizeFirstLetter from "@/ui/utils/capitalizeFirstLetter";

interface CellProps {
    lang: string;
    type: string;
    checked: boolean;
    onSelect: (lang: string) => void;
    onRemove?: (lang: string) => void;
}

export default function Cell({lang, type, checked, onSelect, onRemove}: CellProps) {
    const {strings, locale} = store.locale()


    const id = lang+"_option"

    const languageCanonicalNames = new Intl.DisplayNames((lang == "default" ? locale.val : lang), {
        type: "language",
        style: "short",
        languageDisplay: "standard"
    });

    function click(e: Event) {
        e.stopPropagation()
        const checkbox = document.getElementById(id) as HTMLInputElement
        checkbox.click()
    }

    return (
        <>
            <button class="category">
                <div onClick={click} class="option">
                    <div class="title">
                        {
                            lang == "default" ?
                            `${strings["default"]}` :
                            capitalizeFirstLetter(languageCanonicalNames.of(lang)!)
                        }
                    </div>
                    <div class="subTitle">
                        <span class="text">
                            {
                                lang == "default" ?
                                capitalizeFirstLetter(languageCanonicalNames.of(locale.val)!) :
                                locale.derive((val) => {
                                    const languageNames = new Intl.DisplayNames(val, {
                                        type: "language",
                                        style: "short",
                                        languageDisplay: "dialect"
                                    });

                                    return capitalizeFirstLetter(languageNames.of(lang)!)
                                })
                            }
                        </span>
                        {
                            type == "radio" ?
                            <Radio name="language" checked={checked} onDisable={() => {}} onEnable={() => onSelect(lang)} id={id} />
                            : <Checkbox checked={checked} onDisable={() => onRemove ? onRemove(lang) : {}} onEnable={() => onSelect(lang)} id={id} />
                        }
                    </div>
                </div>
            </button>
            <hr />
        </>
    )
}