export function changeTheme(isDark: boolean) {
    const themeColorTag = document.querySelector('[name="theme-color"]') as HTMLMetaElement;

    const forcedTheme = localStorage.getItem("theme");
    if (forcedTheme) {
        themeColorTag.content = forcedTheme == "dark" ? "#1f1f1f" : "#ffffff";
        document.documentElement.setAttribute("data-theme", forcedTheme);
    } else {
        themeColorTag.content = isDark ? "#1f1f1f" : "#ffffff";
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");			
    }
}

const mq = window.matchMedia("(prefers-color-scheme: dark)");

changeTheme(mq.matches);

mq.addEventListener("change", (e) => changeTheme(e.matches));