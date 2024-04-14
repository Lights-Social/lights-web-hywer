import { store } from "@/data";

export interface DurationProps {
    date: number;
}

export default function Duration({ date }: DurationProps) {
    const {strings} = store.locale()

    const initDate = new Date(date*1000)

    function formatRelative(target: Date) {
        const dateObject = Number(new Date()) - Number(target);

        const seconds = Math.floor(dateObject/1000),
        minutes = Math.floor(seconds/60),
        hours = Math.floor(minutes/60),
        days = Math.floor(hours/24),
        weeks = Math.floor(days/7),
        months = Math.floor(weeks/4),
        years = Math.floor(months/12)

    
        if (1 <= years) {
            const newText = years.toString()+" "+strings["years"]
            return newText;

        } else if (1 <= months) {
            const newText = months.toString()+" "+strings["months"]
            return newText;

        } else if (1 <= weeks) {
            const newText = weeks.toString()+" "+strings["weeks"]
            return newText;
            
        } else if (1 <= days && 2 > days) {
            const newText = days.toString()+" "+strings["days"]
            return newText;

        } else if (1 <= days) {
            const newText = days.toString()+" "+strings["days"]
            return newText;

        } else if (1 <= hours) {
            const newText = hours.toString()+" "+strings["hours"]
            return newText;

        } else if (1 <= minutes) {
            const newText = minutes.toString()+" "+strings["minutes"]
            return newText;

        } else {
            const newText = strings["now"]
            return newText;
        }
    }
      
    return (
        <>
            <span class="lastActivity">
                {formatRelative(initDate)}
            </span>
        </>
    )
    
}