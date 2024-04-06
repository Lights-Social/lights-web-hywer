const hRange = [6, 360];
const sRange = [74, 75];
const lRange = [59, 60];

function getHashOfString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
}

function normalizeHash(hash: number, min: number, max: number) {
    return Math.floor((hash % (max - min)) + min);
}

export function generateHSL(name: string) {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    return [h, s, l];
}

export function HSLtoString(hsl: number[], opacity: number = 100) {
    return `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${opacity}%)`;
}