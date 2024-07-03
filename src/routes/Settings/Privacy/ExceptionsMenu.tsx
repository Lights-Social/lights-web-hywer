import ForbiddenIcon from "@/ui/icons/forbidden";
import AllowShowIcon from "@/ui/icons/allow_show";
import { store } from "@/data";


export default function ExceptionsMenu() {
    const {strings} = store.locale()

    
    return (
        <div class="block">
            <span class="blockTitle">
                { strings["exceptions"] }
            </span>
            <div class="categoriesList">
                <button class="category">
                    <div class="option">
                        <div class="title">
                            <AllowShowIcon />
                            { strings["alwaysShareWith"] }
                        </div>
                        <div class="subTitle">
                            0
                        </div>
                    </div>
                </button>
                <hr />
                <button class="category">
                    <div class="option">
                        <div class="title">
                            <ForbiddenIcon />
                            { strings["neverShareWith"] }
                        </div>
                        <div class="subTitle">
                            0
                        </div>
                    </div>
                </button>
                <hr />
            </div>
        </div>
    )
}