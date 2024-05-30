import { store } from '@/data';
import './styles.css'
import { MobileHeader } from '@/ui/MobileHeader/MobileHeader';
import { navigateTo } from 'hywer/x/router';
import ArrowIcon from '@/ui/icons/arrow';
import EmojiIcon from '@/ui/icons/emoji';



export default function General() {
    const {strings} = store.locale()


    return (
        <>
            <MobileHeader>
                <span class="title">{strings["general"]}</span>
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
        </>
    )
}