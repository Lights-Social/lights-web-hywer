import FormatText from '@/ui/FormatText';
import './styles.css'

import { type IPost } from "@/data/types/models";
import { store } from '@/data';
import { effect, ref } from 'hywer/jsx-runtime';
import { Modal, closeModal, openModal } from '@/ui/Modal/Modal';
import LongArrowIcon from '@/ui/icons/longArrow';
import type { RecReactiveProxy } from 'hywer/x/store';

const item = ref<{id: string, language: string, text: string, type: string}>({id: "", language: "", text: "", type: ""})


export default function TranslateFlow() {
    const {strings, locale} = store.locale()



    const translatedText = ref("")
    
    async function translate() {
        const text = await store.getTranslation(item.val.text, item.val.id, item.val.type, locale)

        translatedText.val = text

    }



    effect(() => {
        
        if (item.val.id != "") {
            translatedText.val = ""
            translate()
        }
    }, [item])

    const languageNames = new Intl.DisplayNames(locale, {
        type: "language",
        style: "short",
        languageDisplay: "standard"
    });

    return (
        <Modal type="flow" id="translateFlow">
            <div class='bar'>
                <div class="title">
                    {strings["translate"]}
                </div>
            </div>
            <div class="translateFlow">
                <div class="fromTo">
                    {item.derive((val) => val.language != "" ? languageNames.of(val.language) : "")}
                    <LongArrowIcon />

                    {languageNames.of(locale)}

                </div>
                <div class='wrapper'>
                    
                    {
                        translatedText.derive((val) => {
                            if (val == "") {
                                return <p class="loading">loading...</p>
                            } else {
                                return <span><FormatText>{val}</FormatText></span>
                            }
                        })
                    }
                </div>
            </div>
            <div class="buttons">
                <button class="accent" onClick={() => {closeModal("translateFlow")}}>{strings["close"]}</button>
            </div>
        </Modal>
    )
}

export function showTranslateFlow(id: string, type: string, text: string, language: string) {

    item.val = {id: id, type: type, language: language, text: text}
    
    openModal("translateFlow", [1], false)
}