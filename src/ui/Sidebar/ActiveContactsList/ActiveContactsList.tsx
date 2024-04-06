import { store } from "@/data"
import "./styles.css"

export default function activeContactsList() {
    const locale = store.locale()

    
    return (
        <div class="activeContactsList">
            <div class="nobodyIsActive">
                <h2>
                    {locale["nobodyIsActive.title"]}
                </h2>
                <p>
                    {locale["nobodyIsActive.description"]}
                </p>
            </div>
        </div>
    )
}