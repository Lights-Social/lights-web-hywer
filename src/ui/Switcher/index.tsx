import "./styles.css"

interface ISwitcherProps {
    id: string;
    checked: boolean;
    onEnable: () => void;
    onDisable: () => void;
}

function Switcher(props: ISwitcherProps) {

    function onChange(e: Event) {
        navigator.vibrate && navigator.vibrate(4)

        const checkbox = e.target as HTMLInputElement;

        if (!checkbox.checked) {
            props.onDisable()
        } else {
            props.onEnable()
        }
    }


    return (
        <>
            <label class="switch">
                <input id={props.id} onChange={onChange} type="checkbox" checked={props.checked} />
                <span class="slider" />
            </label>
        </>
    )
}

export default Switcher