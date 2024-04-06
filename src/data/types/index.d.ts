declare module 'css-animation-sync'

interface Document {
    startViewTransition: (callback: () => any) => void;
}