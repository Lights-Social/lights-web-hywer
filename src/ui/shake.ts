export default function shake(element: HTMLElement) {
    navigator.vibrate && navigator.vibrate([7,7,7,7,])

    element.animate([
        {
            transform: 'translateX(0)'
        },
        {
            transform: 'translateX(6px)'
        },
        {
            transform: 'translateX(-6px)'
        },
        {
            transform: 'translateX(6px)'
        },
        {
            transform: 'translateX(0)'
        }
    ], 300)
}