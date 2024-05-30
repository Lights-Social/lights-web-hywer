export const hashCode = (s: string) => s.split('').reduce((a: number,b: string) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)
