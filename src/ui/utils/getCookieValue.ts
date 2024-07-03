export function getCookieValue(name: string) {
    const c = document.cookie.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)
    if (c && c[1]) return decodeURIComponent(c[1])
}

export function deleteCookie( name: string, path: string, domain: string ) {
	document.cookie = name + "=" +
		((path) ? ";path="+path:"")+
		((domain)?";domain="+domain:"") +
		";expires=Thu, 01 Jan 1970 00:00:01 GMT";
}