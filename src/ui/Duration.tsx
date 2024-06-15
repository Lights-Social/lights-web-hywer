import { store } from "@/data";
//import random_id from "../utils/random_id";

// function getUpdateTimeout(date: Date, id: string) {
//     let updateTimeout = null;

//     const isToday = (date.getMonth() == new Date().getMonth()) && (date.getFullYear() == new Date().getFullYear()) && ((new Date().getDate() == date.getDate()))

//     if (isToday) {
//         const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
//         updateTimeout = (tomorrow.getTime() / 1000 ) % 86400
//     } else if ((date.getMonth() == new Date().getMonth()) && (date.getFullYear() == new Date().getFullYear()) && ((new Date().getDate() - date.getDate()) == 1)) {  
//         updateTimeout = (date.getTime() / 1000) % 86400
//     } else if (new Date().getFullYear() == date.getFullYear()) {
//         updateTimeout = (date.getTime() / 1000) % 31536000
//     }

//     if (!updateTimeout) return;

//     console.log(updateTimeout / 60 / 60)

//     setTimeout(() => {
//         const timeElement = document.querySelector<HTMLTimeElement>(`#${id}`)
//         timeElement!.innerHTML = formatRelative(date)
//         getUpdateTimeout(date, id)
//     }, updateTimeout * 1000)
// }

export default function Duration({ date }: { date: string }) {
    //const id = random_id()

    const {strings, locale} = store.locale()

    const initDate = new Date(date)

    function formatRelative(date: Date) {        
        const isToday = (date.getMonth() == new Date().getMonth()) && (date.getFullYear() == new Date().getFullYear()) && ((new Date().getDate() == date.getDate()))
    
        if (isToday) {
            return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date)
        } else if ((date.getMonth() == new Date().getMonth()) && (date.getFullYear() == new Date().getFullYear()) && ((new Date().getDate() - date.getDate()) == 1)) {  
            return strings["yd"]+new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date)
        } else if (new Date().getFullYear() == date.getFullYear()) {
            return new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'short'}).format(date)
        } else {
            return new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'short', year: 'numeric'}).format(date)
        }
    }

    return (
        <time class="duration" datetime={date}>
            {formatRelative(initDate)}
        </time>
    )
}