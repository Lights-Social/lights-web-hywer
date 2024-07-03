import type { ReactivePost } from "../ReactivePost";

interface Document extends Document {
    startViewTransition: (callback: () => any) => void;
}


declare global {
    var getGlobalProfile: Map<string, ReactiveProfile>;
    var getGlobalPost: Map<string, ReactivePost>;
}