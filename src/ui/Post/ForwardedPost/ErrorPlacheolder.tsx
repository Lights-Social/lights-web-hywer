import { store } from '@/data'
import './styles.css'

export default function ErrorPlaceholder() {

    const {strings} = store.locale()

    return (
        <div onDblClick={(e: Event) => e.stopPropagation()} class="forwardedPost">
            <span class='error'>{strings["thisPostIsUnavailable"]}</span>
        </div>
    )

}