import { store } from "@/data"
import { ref } from "hywer/jsx-runtime"
import AppearanceSettings from "./AppearanceSettings/AppearanceSettings"

export default function Settings() {
    const {strings, locale} = store.locale()

    const language = ref<string>(locale)


    async function changeLang(lang: string) {
        await store.setLocale(lang)

        language.val = lang

    }

    return (
        <>
            <h1>{strings["language"]}</h1>
            {language.derive(val => {
                return <>
                    <button disabled={val == "uk"} onClick={() => changeLang("uk")}>uk</button>
                    <button disabled={val == "en-US"} onClick={() => changeLang("en-US")}>en-US</button>
                </>
                
            })

            }
            <AppearanceSettings />

        </>
    )
}