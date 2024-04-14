const w = (window as any);
const n = w.navigator;
const ua = n.userAgent;

export const isIPhone: boolean = /*#__PURE__*/ /iphone/i.test(ua);

/** Is IPad Device */
export const isIPad: boolean = /*#__PURE__*/ /ipad/i.test(ua) && n.maxTouchPoints > 1;

/** Is IPod Device */
export const isIPod: boolean = /*#__PURE__*/ /ipod/i.test(ua);

/** Is IOS Device */
export const isIOS: boolean = isIPhone || isIPad || isIPod;