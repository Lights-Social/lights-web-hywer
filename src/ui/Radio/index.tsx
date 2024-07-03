import "./styles.css"

interface IRadioProps {
    id: string;
    checked: boolean;
    onEnable: () => void;
    onDisable: () => void;
    name: string
}

function Radio(props: IRadioProps) {

    function onChange(e: Event) {
        e.stopPropagation()
        navigator.vibrate && navigator.vibrate(4)

        const checkbox = e.target as HTMLInputElement;

        if (!checkbox.checked) {
            props.onDisable()
        } else {
            props.onEnable()
        }
    }


    return (
        <label class="radio">
            <input id={props.id} onChange={onChange} type="radio" name={props.name} checked={props.checked} />
            <div class="point" />
        </label>
    )
}

export default Radio