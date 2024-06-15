type BoxProps = {
    children: string;
};

export default function Spoiler({children}: BoxProps) {
    function open(e: Event) {
        const element = e.target as HTMLSpanElement

        element.classList.remove("spoilered")
    }

    return (
        <span onClick={open} class="spoiler spoilered">
            {children}
        </span>
    )
}