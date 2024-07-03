export default function getDifferenceBetweenDates(dateStr1: string | number | Date, dateStr2: string | number | Date) {
    // Создаем объекты Date из строковых представлений дат
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    const dateObject = Number(date1) - Number(date2);

    const seconds = Math.floor(dateObject/1000),
    minutes = Math.floor(seconds/60),
    hours = Math.floor(minutes/60)

    return {ms: dateObject, hours: hours}
}