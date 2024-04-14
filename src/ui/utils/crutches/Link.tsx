import type { JSX } from "hywer/jsx-runtime"
import { navigateTo } from "hywer/x/router"

interface LinkProps {
    children?: JSX.Element
    href: string;
    onClick?: (e: Event) => void
    'aria-label'?: string;
    class?: string
}

export default function Link(props: LinkProps) {
    function handleClick(e: Event) {
        e.preventDefault()
        
        if (props.onClick) props.onClick(e)

        if (props.href != location.pathname) {
            navigateTo(props.href)
        }
        
    }

    return <a class={props.class} aria-label={props['aria-label']} href={props.href} onClick={handleClick}>
        {props.children}
    </a>
}