import './styles.css'

export interface DigitCounterProps {
    count: number;
}

function DigitCounter(props: DigitCounterProps) {

    function formatNumber(number: number) {
        const suffixes = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
        const thousand = 1000;
        if (number < thousand) return number.toString();
      
        const exponent = Math.floor(Math.log10(number) / 3);
        const suffix = suffixes[exponent];
        const shortNumber = number / Math.pow(thousand, exponent);
      
        // Округляем до 1 знака после запятой
        const roundedNumber = Math.round(shortNumber * 10) / 10;
        return roundedNumber.toString() + suffix;
      }


    return (
        <div class="digitCounter">
            {formatNumber(props.count)}
        </div>
    )
}

export default DigitCounter;