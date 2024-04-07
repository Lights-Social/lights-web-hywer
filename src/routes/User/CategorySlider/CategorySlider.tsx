import { store } from '@/data';
import './styles.css'
//import DigitCounter from "../../../components/UI/DigitCounter";
import EditedIcon from "@/ui/icons/edited"
import MomentIcon from '@/ui/icons/moment';

interface CategorySliderProps {
    tab: string;
    posts: number;
    moments: number;
    onSelectTab: (tab: string) => void
}

export default function CategorySlider(props: CategorySliderProps) {
    const {strings} = store.locale()

    function setTab(tab: string) {
        props.onSelectTab(tab);

        if (navigator.vibrate) navigator.vibrate([1])

    }

    
    return (
        <div class="categorySlider">
            {
                props.posts > 0 ?
                <button onClick={() => setTab("posts")} class={props.tab === "posts" ? "active" : ""}>
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
                <button onClick={() => setTab("moments")} class={props.tab === "moments" ? "active" : ""}>
                    <MomentIcon />
                    <div class="title">
                        {strings["moments"]}
                        <span>
                            {/* <DigitCounter count={props.moments} /> */} {props.moments}
                        </span>
                    </div>
                    
                </button> : null
            }
        </div>
    )
}