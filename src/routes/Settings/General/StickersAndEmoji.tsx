import { Show, createSignal } from "solid-js";
import { useI18n } from '@solid-primitives/i18n';
import './styles.css'
import { useNavigate } from '@solidjs/router';
import { createMediaQuery } from "@solid-primitives/media";
import { MobileHeader } from "../../../components/MobileHeader";

const reactions = [
    {
        "id": ":strawberry:",
        "emoji": "🍓"
    },
    {
        "id": ":thumbs-up:",
        "emoji": "👍"
    },
    {
        "id": ":red-heart:",
        "emoji": "❤️"
    },
    {
        "id": ":fire:",
        "emoji": "🔥"
    },
    {
        "id": ":heart-on-fire:",
        "emoji": "❤️‍🔥"
    },
    {
        "id": ":clown-face:",
        "emoji": "🤡"
    },
    {
        "id": ":pile-of-poo:",
        "emoji": "💩"
    },
    {
        "id": ":middle-finger:",
        "emoji": "🖕"
    }
]

export default function StickersAndEmoji() {
    const [t] = useI18n();

    const navigate = useNavigate();

    function openCategory(category: string) {

        console.log("pizda")

        console.log(category)

        if (!document.startViewTransition) {
            navigate(category)
            return;
        }

        document.startViewTransition(() => navigate(category));
        
    }

    const isPhone = createMediaQuery("(max-width: 480px)")

    //const quickReaction = () => localStorage.getItem("quickReaction") ? String(localStorage.getItem("quickReaction")) : ":thumbs-up:"

    const [quickReaction, setQuickReaction] = createSignal(localStorage.getItem("quickReaction") ? String(localStorage.getItem("quickReaction")) : ":thumbs-up:");

    function showReactionsList() {

    }



    function set(reaction_id: string) {
        navigator.vibrate && navigator.vibrate([2])

        setQuickReaction(reaction_id)

        localStorage.setItem("quickReaction", reaction_id)
    }



    return (
        <>
            <Show when={isPhone()}>
                <MobileHeader>
                    <span class="title">{t("stickersAndEmoji")}</span>
                </MobileHeader>
            </Show>
            <main class='settingsView'>
                <div class='window'>
                    <div class="categoriesList">
                        <button class="category">
                            <div class="title">
                                <svg viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.5433 0.22013C4.47202 0.230236 4.27814 0.265875 4.11006 0.296459C1.91861 0.67358 0.195762 2.58498 0.0173076 4.8275C-0.0845524 6.07615 0.267038 7.35538 0.970483 8.28808C1.29149 8.71121 7.20894 14.6845 7.48926 14.8627C7.86638 15.1023 8.34031 15.2042 8.77886 15.138C9.46183 15.0311 9.35465 15.1225 12.6881 11.7691C14.375 10.0668 15.8734 8.52771 16.0162 8.3442C16.3372 7.92639 16.7399 7.11603 16.8878 6.58572C16.9846 6.23413 17 6.05567 17 5.26047C17 4.40437 16.9899 4.31235 16.8572 3.88443C15.7971 0.423851 11.7961 -0.911499 8.94721 1.23926L8.50865 1.57091L8.34563 1.43846C7.7084 0.91347 6.939 0.51587 6.19992 0.337682C5.80737 0.245662 4.80845 0.174386 4.5433 0.22013Z"/>
                                </svg>


                                {t("quickReaction")}
                            </div>
                            <div class="subTitle emoji">
                                {reactions.find(r => r.id == quickReaction())?.emoji}
                            </div>
                        </button>
                    </div>
                    <div class="reactionsSelector">
                    <button onClick={() => set(":thumbs-up:")}>
                        👍
                    </button>
                    <button onClick={() => set(":red-heart:")}>
                        ❤️
                    </button>
                    <button onClick={() => set(":clown-face:")}>
                        🤡
                    </button>
                    <button onClick={() => set(":strawberry:")}>
                        🍓
                    </button>
                    <button onClick={() => set(":heart-on-fire:")}>
                        ❤️‍🔥
                    </button>
                    <button onClick={() => set(":fire:")}>
                        🔥
                    </button>
                    <button onClick={() => set(":pile-of-poo:")}>
                        💩
                    </button>
                    <button onClick={() => set(":middle-finger:")}>
                        🖕
                    </button>
                    </div>
                </div>
            </main>
        </>
    )
}