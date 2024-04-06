export function getCookieValue(name) {
    const c = document.cookie.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)    
    if (c && c[1]) return decodeURIComponent(c[1])
}

export async function Api(uri, method = 'GET', body = null, jsonBody = false) {
    const myHeaders = new Headers();
    let access_token = getCookieValue("access_token");
    if (access_token) myHeaders.set('Authorization', `Bearer ${access_token}`);

    if (jsonBody) myHeaders.set('Content-Type', 'application/json');

    const response = await fetch(`${import.meta.env.VITE_LIGHTS_API_URL}/${uri}`, {
        headers: myHeaders,
        method: method,
        body: body,
    })


    return response;
}