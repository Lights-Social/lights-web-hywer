import { store } from '@/data';
import './styles.css'
//import DigitCounter from "../../../components/UI/DigitCounter";
import EditedIcon from "@/ui/icons/edited"
import MomentIcon from '@/ui/icons/moment';
import type { IProfile } from '@/data/types/models';
import type { Reactive } from 'hywer/jsx-runtime';
import FavoritesIcon from '@/ui/icons/favorites';
import type { RecReactiveProxy } from 'hywer/x/store';

interface CategorySliderProps {
    tab: Reactive<string>;
    onSelectTab: (tab: string) => void;
    profile: RecReactiveProxy<IProfile>
}

export default function CategorySlider({tab, onSelectTab, profile}: CategorySliderProps) {
    const {strings} = store.locale()
    const user_id = store.auth.user_id()


    function setTab(tab: string) {
        onSelectTab(tab);

        if (navigator.vibrate) navigator.vibrate([1])

    }

    
    
    
    return (
        <div class="categorySlider">
            {
                profile.posts.derive((val) => {
                    if (val > 0) {
                        return <button onClick={() => setTab("posts")} class={tab.derive((val) => val === "posts" ? "active" : "")}>
                            <EditedIcon />

                            <div class="title">
                                {strings["posts"]}
                                <span>
                                    {val}
                                </span>
                            </div>
                        </button>
                    } else {
                        return <div style="display: none;" />
                    }
                })
            }

            {
                profile.moments.derive((val) => {
                    if (val > 0) {
                        return <button onClick={() => setTab("moments")} class={tab.derive((val) => val === "moments" ? "active" : "")}>
                            <MomentIcon />

                            <div class="title">
                                {strings["moments"]}
                                <span>
                                    {val}
                                </span>
                            </div>
                        </button>
                    } else {
                        return <div style="display: none;" />
                    }
                })
            }

            {
                profile.id.derive((val) => {
                    if (val == user_id) {
                        return <button onClick={() => setTab("favorites")} class={tab.derive((val) => val === "favorites" ? "active" : "")}>
                            <FavoritesIcon />

                            <div class="title">
                                {strings["favorites"]}
                            </div>
                        </button>
                    } else {
                        return <div style="display: none;" />
                    }
                })
            }
        </div>
    )
}