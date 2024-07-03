import { store } from '@/data';
import './styles.css'
import { MobileHeader } from '@/ui/MobileHeader/MobileHeader';
import { navigateTo } from 'hywer/x/router';
import ArrowIcon from '@/ui/icons/arrow';
import EmojiIcon from '@/ui/icons/emoji';
import Radio from '@/ui/Radio';
import BackIcon from "@/ui/icons/back"
import type { Reactive } from 'hywer/jsx-runtime';

interface GeneralProps {
    category: Reactive<string>
}

export default function General({category}: GeneralProps) {
    const {strings} = store.locale()


    return (
        <div class='window'>
            <MobileHeader>
                <>
                    <button class='close' onClick={() => category.val = ""}>
                        <BackIcon />
                        {strings["back"]}
                    </button>
                    <span class="title">{strings["general"]}</span>
                </>
            
            </MobileHeader>
            <div class="categoriesList">
                <button class="category" onClick={() => navigateTo("/settings/general/emoji", {})}>
                    <div class="title">
                        <EmojiIcon />
                        {strings["stickersAndEmoji"]}
                    </div>
                    <div class="subTitle">
                        <ArrowIcon />
                    </div>
                </button>
            </div>
        </div>
    )
}