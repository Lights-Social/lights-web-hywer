import type { ReactivePost } from "../ReactivePost";

declare module 'css-animation-sync'

interface Document {
    startViewTransition: (callback: () => any) => void;
}


declare global {
    var getGlobalProfile: Map<string, ReactiveProfile>;
    var getGlobalPost: Map<string, ReactivePost>;
}