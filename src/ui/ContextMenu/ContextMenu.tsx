// // import { ContextMenuButton } from "../../../types/models";

import type { JSX } from "hywer/jsx-runtime";

// import './styles.css'
// import './ReactionsBar.css'
// // import { useUserStorage } from "../../UserStorage";

// // interface useContextMenuProps {
// // 	buttons: ContextMenuButton[]
// // }



// interface ReactionsBarProps {
// 	reactFunction: Function;

// }

// function ReactionsBar(props: ReactionsBarProps) {
// 	return (
// 		<div class="reactionsBar">
// 			<button onClick={() => props.reactFunction(":thumbs-up:")}>
// 				👍
// 			</button>
// 			<button onClick={() => props.reactFunction(":red-heart:")}>
// 				❤️
// 			</button>
// 			<button onClick={() => props.reactFunction(":clown-face:")}>
// 				🤡
// 			</button>
// 			<button onClick={() => props.reactFunction(":strawberry:")}>
// 				🍓
// 			</button>
// 			<button onClick={() => props.reactFunction(":heart-on-fire:")}>
// 				❤️‍🔥
// 			</button>
// 			<button onClick={() => props.reactFunction(":fire:")}>
// 				🔥
// 			</button>
// 			<button onClick={() => props.reactFunction(":pile-of-poo:")}>
// 				💩
// 			</button>
// 			<button onClick={() => props.reactFunction(":middle-finger:")}>
// 				🖕
// 			</button>
// 		</div>
// 	)
// }

async function removeAllMenus() {
	document.removeEventListener('click', removeAllMenus);
	document.removeEventListener('scroll', removeAllMenus);


	document.querySelectorAll(".contextMenu").forEach(async (item) => {
		item.animate([
			{
				transform: 'scale(1)',
				opacity: 1
			},
			{
				transform: 'scale(0.9)',
				opacity: 0
			},
		
		], 75)

		await Promise.all(item.getAnimations().map((animation) => animation.finished))
		item.remove()
	})
}

// export function useContextMenu() {
// 	//const account = useUserStorage();


// 	const [coordinates, setCoordinates] = createSignal({ x: 0, y: 0 })
// 	const [menuButtons, setMenuButtons] = createSignal<ContextMenuButton[]>([])



// 	function ContextMenu() {
// 		let ref: HTMLDivElement | undefined;
		

// 		createEffect(() => {
// 			if (!ref) return;

// 			ref.style.left = `${coordinates().x}px`;
// 			ref.style.top = `${coordinates().y}px`;


// 			ref.animate([
//                 {
//                     transform: 'scale(0.9)',
// 					opacity: 0
//                 },
//                 {
//                     transform: 'scale(1)',
// 					opacity: 1
//                 },

//             ], 100)
// 		})


	
// 		// Устанавливаем слушатель события клика при монтировании компонента
// 		onMount(() => {
// 			document.addEventListener('click', removeAllMenus);
// 			document.addEventListener('scroll', removeAllMenus);

// 		});
	
// 		return (
// 			<div ref={ref} class={localStorage.getItem("blurEnabled") == "true" ? "contextMenu blur" : "contextMenu"}>
				
// 			</div>
// 		)
// 	}


// 	function toggle(coordinates: {x: number, y: number}) {


// 		removeAllMenus();

// 		setCoordinates(coordinates)
// 		//setMenuButtons(buttons)


// 		//render(() => <ContextMenu />, (document.querySelector("main") as HTMLDivElement));

	
// 	}


// 	return [toggle];
// }


export function showContextMenu(element: JSX.Element, coordinates: {x: number, y: number}) {


    removeAllMenus();

	const contextMenu = document.createElement("div")
	contextMenu.className = "contextMenu blur"
	contextMenu.style.left = `${coordinates.x}px`;
	contextMenu.style.top = `${coordinates.y}px`;
	contextMenu.append(...element)

    document.body.append(contextMenu);

	function addListeners() {
		console.log("removed")

		
		document.addEventListener('click', removeAllMenus);
		document.addEventListener('scroll', removeAllMenus);
	}


	contextMenu.animate([
		{
			transform: 'scale(0.9)',
			opacity: 0
		},
		{
			transform: 'scale(1)',
			opacity: 1
		},

	], 100)

	setTimeout(() => addListeners(), 100)

}