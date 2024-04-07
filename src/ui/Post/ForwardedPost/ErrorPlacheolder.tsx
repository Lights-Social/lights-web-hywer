import { useI18n } from '@solid-primitives/i18n';
import './styles.css'

export default function ErrorPlaceholder() {

    const [t] = useI18n();

    return (
        <div onDblClick={(e) => e.stopPropagation()} class="forwardedPost">
            <span class='error'>{t("thisPostIsUnavailable")}</span>
        </div>
    )

}