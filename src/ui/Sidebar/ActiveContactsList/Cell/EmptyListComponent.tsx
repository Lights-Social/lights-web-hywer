import { useI18n } from '@solid-primitives/i18n';

function EmptyListComponent() {
    const [t] = useI18n();


    return (
        <div class="nobodyIsActive">
            <h2>
                {t("nobodyIsActive.title")}
            </h2>
            <p>
                {t("nobodyIsActive.description")}
            </p>
        </div>
    )
}

export default EmptyListComponent;