import type { JSX } from 'hywer/jsx-runtime';
import './styles.css'
interface MobileHeaderProps {
    children: JSX.Element;
    opacity?: number;
    rightButton?: JSX.Element;
}

export function MobileHeader(props: MobileHeaderProps) {
    let ref: HTMLDivElement | undefined;

    const RightButtonComponent = () => props.rightButton!; // Предположим, что rightButton - это компонент

    return (
        <>
            <header style={{"opacity": props.opacity}} ref={ref} class={localStorage.getItem("blurEnabled") == "true" ? "mobileHeader blur" : "mobileHeader"}>
                {props.children}
            </header>
            {
                props.rightButton ?
                <RightButtonComponent /> : null
            }
        </>
        
    )
}

