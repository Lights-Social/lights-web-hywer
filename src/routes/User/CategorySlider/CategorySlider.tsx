import { store } from '@/data';
import './styles.css'
//import DigitCounter from "../../../components/UI/DigitCounter";
import EditedIcon from "@/ui/icons/edited"
import MomentIcon from '@/ui/icons/moment';
import type { IProfile } from '@/data/types/models';
import type { Reactive } from 'hywer/jsx-runtime';
import FavoritesIcon from '@/ui/icons/favorites';

interface CategorySliderProps {
    tab: Reactive<string>;
    posts: number;
    moments: number;
    onSelectTab: (tab: string) => void;
    profile: IProfile
}

export default function CategorySlider(props: CategorySliderProps) {
    const {strings} = store.locale()
    const user_id = store.auth.user_id()


    function setTab(tab: string) {
        props.onSelectTab(tab);

        if (navigator.vibrate) navigator.vibrate([1])

    }

    
    
    
    return (
        <div class="categorySlider">
            {
                props.posts > 0 ?
                <button onClick={() => setTab("posts")} class={props.tab.derive((val) => val === "posts" ? "active" : "")}>
                    <EditedIcon />

                    <div class="title">
                        {strings["posts"]}
                        <span>
                            {props.posts}
                        </span>
                    </div>
                </button> : null
            }
            {
                props.moments > 0 ?
                <button onClick={() => setTab("moments")} class={props.tab.derive((val) => val === "moments" ? "active" : "")}>
                    <MomentIcon />
                    <div class="title">
                        {strings["moments"]}
                        <span>
                            {/* <DigitCounter count={props.moments} /> */} {props.moments}
                        </span>
                    </div>
                    
                </button> : null
            }
            {
                props.profile.id == user_id ?
                <button onClick={() => setTab("favorites")} class={props.tab.derive((val) => val === "favorites" ? "active" : "")}>
                    <FavoritesIcon />
                    <div class="title">
                        {strings["favorites"]}

                        {/* <span>
                            <DigitCounter count={props.moments} />
                        </span> */}
                    </div>
                </button> : null
            }
        </div>
    )
}