import { type JSX } from 'hywer/jsx-runtime';
import './styles.css'

interface BubbleProps {
    children: JSX.Element;
    id: string;
}


export default function showBubble(id: string) {
	const popup = document.querySelector<HTMLDivElement>('#' + id);

	popup?.showPopover();
	setTimeout(() => popup?.hidePopover(), 2000);
};

export function Bubble(props: BubbleProps) {
    
    return (
		<div id={props.id} popover="manual">
			{props.children}
		</div>
    )
}