import "./styles.css"
import Checkmark2Icon from "@/ui/icons/checkmark2";

interface ICheckboxProps {
    id: string;
    checked: boolean;
    onEnable: () => void;
    onDisable: () => void;
}

function Checkbox(props: ICheckboxProps) {

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
        <label class="checkbox">
            <input id={props.id} onChange={onChange} type="checkbox" checked={props.checked} />
            <div class="check">
                <Checkmark2Icon />
            </div>
        </label>
    )
}

export default Checkbox