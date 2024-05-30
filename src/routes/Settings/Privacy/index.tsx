import { store } from '@/data';
import './styles.css'
import { MobileHeader } from '@/ui/MobileHeader/MobileHeader';
import ArrowIcon from '@/ui/icons/arrow';
import { navigateTo } from 'hywer/x/router';



export default function Privacy() {
    const {strings} = store.locale()

    return (
        <>
            <MobileHeader>
                <span class="title">{strings["privacyAndSecurity"]}</span>
            </MobileHeader>
            <div class="categoriesList">
                <button class="category" onClick={() => navigateTo("/settings/privacy/activity", {})}>
                    <div class="title">
                        {strings["activityStatus"]}
                    </div>
                    <div class="subTitle">
                        {strings["nobody"]}
                        <ArrowIcon />
                    </div>
                </button>
            </div>
        </>
    )
}