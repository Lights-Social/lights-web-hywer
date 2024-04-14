export function getCookieValue(name: string) {
    const c = document.cookie.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)
    if (c && c[1]) return decodeURIComponent(c[1])
}