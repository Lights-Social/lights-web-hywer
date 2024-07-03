import { store } from '@/data';
import './styles.css'
import { MobileHeader } from '@/ui/MobileHeader/MobileHeader';
import ArrowIcon from '@/ui/icons/arrow';
import { derive, type Reactive } from 'hywer/jsx-runtime';
import ActiveIcon from '@/ui/icons/active';
import AvatarIcon from '@/ui/icons/avatar';
import MomentIcon from '@/ui/icons/moment';

interface PrivacyProps {
    category: Reactive<string>
}

export default function Privacy({category}: PrivacyProps) {
    const {strings} = store.locale()

    return (
        <div class='window'>
            <MobileHeader>
                <span class="title">{strings["privacyAndSecurity"]}</span>
            </MobileHeader>
            <div class="categoryTitle">
                { strings["privacyAndSecurity"] }
            </div>
            <div class="categoriesList">
                <button class="category" onClick={() => category.val = "privacy/activity"}>
                    <div class="option">
                        <div class="title">
                            <ActiveIcon />
                            {strings["activityStatus"]}
                        </div>
                        <div class="subTitle">
                            <span class="text">
                                {
                                    derive(([access, exceptions]) => {
                                        return strings[access.val];
                                    }, [store.settings!.privacy.activity.access, store.settings!.privacy.activity.exceptions])
                                }
                            </span>
                            <ArrowIcon />
                        </div>
                    </div>
                </button>
                <hr />
                <button class="category" onClick={() => category.val = "privacy/avatar"}>
                    <div class="option">
                        <div class="title">
                            <AvatarIcon />
                            {strings["avatar"]}
                        </div>
                        <div class="subTitle">
                            <span class="text">
                                {strings["nobody"]}
                            </span>
                            <ArrowIcon />
                        </div>
                    </div>
                </button>
                <hr />
                <button class="category" onClick={() => category.val = "privacy/bio"}>
                    <div class="option">
                        <div class="title">
                            
                            {strings["bio"]}
                        </div>
                        <div class="subTitle">
                            <span class="text">
                                {strings["nobody"]}
                            </span>
                            <ArrowIcon />
                        </div>
                    </div>
                </button>
                <hr />
                <button class="category" onClick={() => category.val = "privacy/cover"}>
                    <div class="option">
                        <div class="title">
                            
                            {strings["cover"]}
                        </div>
                        <div class="subTitle">
                            <span class="text">
                                {strings["nobody"]}
                            </span>
                            <ArrowIcon />
                        </div>
                    </div>
                </button>
                <hr />
                <button class="category" onClick={() => category.val = "privacy/posts"}>
                    <div class="option">
                        <div class="title">
                            
                            {strings["posts"]}
                        </div>
                        <div class="subTitle">
                            <span class="text">
                                {strings["nobody"]}
                            </span>
                            <ArrowIcon />
                        </div>
                    </div>
                </button>
                <hr />
                <button class="category" onClick={() => category.val = "privacy/moments"}>
                    <div class="option">
                        <div class="title">
                            <MomentIcon />
                            {strings["moments"]}
                        </div>
                        <div class="subTitle">
                            <span class="text">
                                {strings["nobody"]}
                            </span>
                            <ArrowIcon />
                        </div>
                    </div>
                </button>
                <hr />
            </div>
        </div>
    )
}