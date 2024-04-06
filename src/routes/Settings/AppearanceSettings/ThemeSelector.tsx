import { changeTheme } from "@/ui/theme";
import { ref } from "hywer/jsx-runtime"

import LightThemeIcon from '@/ui/icons/lightTheme';
import SystemThemeIcon from '@/ui/icons/systemTheme';
import DarkThemeIcon from '@/ui/icons/darkTheme';
import { store } from "@/data";


export default function ThemeSelector() {
    const currentTheme = ref(localStorage.getItem("theme") || "system")
    const locale = store.locale()

    
    async function setTheme(theme: string) {
        if (currentTheme.val == theme) return;

        currentTheme.val = theme

        navigator.vibrate && navigator.vibrate([5,1])

        if (theme == "system") {
            localStorage.removeItem("theme");
        } else {
            localStorage.setItem("theme", theme);
        }

        const mq = window.matchMedia("(prefers-color-scheme: dark)");

        changeTheme(theme == "system" ? mq.matches : theme == "dark");

    }
    
    return (
        <>
            {
                currentTheme.derive(theme => {
                    return <div class="themeSelector">
                        <button class={theme == "light" ? "selected" : ""} onClick={() => setTheme("light")}>
                            <div class="icon">
                                <LightThemeIcon />
                            </div>
                            <span>{locale["light"]}</span>
                        </button>
                        <button class={theme == "system" ? "selected" : ""} onClick={() => setTheme("system")}>
                            <div class="icon">
                                <SystemThemeIcon />
                            </div>
                            <span>{locale["system"]}</span>
                        </button>
                        <button class={theme == "dark" ? "selected" : ""} onClick={() => setTheme("dark")}>
                            <div class="icon">
                                <DarkThemeIcon />
                            </div>
                            <span>{locale["dark"]}</span>
                        </button>
                    </div>
                })
            }
        </>
    )


}