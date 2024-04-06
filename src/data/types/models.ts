//import { JSXElement } from "solid-js";
//import { IResponse } from "../components/api";

export interface MediaAttachment {
    file?: File;
    source: string;
    preview?: string;
    photo_id?: string;
    width: number;
    height: number;
}

export interface IReaction {
    count: number;
    is_reacted: boolean;
    id: string;
}

export interface IPhotoAttachment {
    photo_id: string;
    url?: string;
    alt: string;
    preview: string;
    width: number;
    height: number;
}

export interface ILinkAttachment {
    url: string;
    title: string;
    description: string;
    source: string;
    picture: string;
}

export interface IPeer {
    type: "user" | "community";
    id: string;
}


export interface IPost {
    id: string;
    random_id?: number;
    is_pinned: boolean;
    is_edited: boolean;
    text: string;
    language: string;
    attachments: {
        photos: IPhotoAttachment[];
        links?: ILinkAttachment[];
    };
    date: string;
    reactions: IReaction[];
    comments: {
        commenting: boolean;
        count: number;
    };
    views: number;
    peer: IPeer;
    access: 'all' | 'friends' | 'private';
}

export interface IMoment {
    id: string;
    is_pinned: boolean;
    text: string;
    language: string;
    attachments: {
        photos?: IPhotoAttachment[];
        links?: ILinkAttachment[];
    };
    date: string;
    likes: {
        isLiked: boolean;
        count: number;
    };
    comments: {
        commenting: boolean;
        count: number;
    };
    views: number;
    peer: IPeer;
}

export interface Replies {
	isAuthorReplied: boolean;
	count: number
}

export interface IComment {
    id: string;
    random_id?: number;
    is_pinned: boolean;
    is_edited: boolean;
    text: string;
    language: string;
    attachments: {
        photos: IPhotoAttachment[];
        links?: ILinkAttachment[];
    };
    date: string;
    reactions: IReaction[];
    replies: Replies;
    peer: IPeer;
}

export interface Avatar {
    picture: string;
    wrapper: string;
    preview: string;
    date: number;
}

export interface IStatus {
    status: string;
    last_activity: number;
}

export interface IProfile {
    id: string;
    name: string;
    about: string;
    username: string;
    is_premium: boolean;
    sex: null;
    avatar: Avatar[];
    cover: string;
    verified: boolean;
    status: IStatus;
    followers: {
        count: number;
        is_following: boolean;
    };
    friends: {
        count: number;
        friendship_state: "friends" | "notFriends" | "pending" | "confirmation";
    };
    note: string;
    wallet_uri: string;
}


// export interface ContextMenuButton {
//     icon?: JSXElement;
//     type: "button" | "delete" | "reactionsBar",
//     title?: string;
//     function?: Function;
// }


// export interface PostViewStateProps {
// 	response: IResponse<IPost>
// 	meta: {
// 		prev: string
// 	}
// }

type Includes = {
    users: IProfile[];
    requests?: {
      incoming: number;
      outgoing: number;
    }
}

export type IResponsePosts<T> = {
    data: T[]
    includes: Includes
}