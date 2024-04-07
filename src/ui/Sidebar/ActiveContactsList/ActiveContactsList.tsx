import { store } from "@/data"
import "./styles.css"

export default function activeContactsList() {
    const {strings} = store.locale()

    
    return (
        <div class="activeContactsList">
            <div class="nobodyIsActive">
                <h2>
                    {strings["nobodyIsActive.title"]}
                </h2>
                <p>
                    {strings["nobodyIsActive.description"]}
                </p>
            </div>
        </div>
    )
}