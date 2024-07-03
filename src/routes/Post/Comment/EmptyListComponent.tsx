import { store } from "@/data"

function EmptyListComponent() {
    const {strings} = store.locale()

    
    return (
        <div class="emptyPlaceholder">
            <div class="title">
                {strings["noCommentsHereYet"]}
            </div>
        </div>
    )
}

export default EmptyListComponent