import type { DBSchema } from 'idb';

export interface LightsDB extends DBSchema {

    posts: {
		value: IPost;
		key: string;
		indexes: {
            'by-post-id': string,
        };
    };
    comments: {
		value: IComment;
		key: string;
		indexes: {
            'by-comment-id': string,
        };
    };
    translations: {
		value: ITranslation;
		key: string;
		indexes: {
            'by-hash': number,
        };
    };
    users: {
		value: IProfile;
		key: string;
		indexes: {
            'by-id': string,
            'by-username': string
        };
    };

    friends: {
		value: IFriend;
		key: string;
		indexes: {
            'by-id': string,
        };
    };
}

export interface ITranslation {
    hash: number;
    text: string;
}

export interface IAudio {
    isrc: string;
    title: string;
    artist: string;
    artwork: string;
    spotify: string;
    apple_music: string;
    youtube: string;
}

export interface IReaction {
    count: number;
    is_reacted: boolean;
    id: string;
}

export interface IMediaAttachment {
    id: string;
    alt: string;
    blurhash: string;
    width: number;
    height: number;
    type: string;
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

interface Object {
    post_id: string;
    notAvailable: boolean;
}


export interface IPost {
    id: string;
    random_id?: number;
    is_pinned: boolean;
    is_edited: boolean;
    text: string;
    language: string;
    attachments: {
        media: IMediaAttachment[];
        links?: ILinkAttachment[];
        audios: IAudio[];
    };
    date: string;
    reactions: IReaction[];
    comments: {
        commenting: boolean;
        count: number;
    };
    views: number;
    peer: IPeer;
    access: 'all' | 'friends' | 'private',
    reposts: {
        count: number;
        objects: Object[];
        initialPosts: IPost[];
    }
    is_favorite: boolean;
}

export interface IMoment {
    id: string;
    is_pinned: boolean;
    text: string;
    language: string;
    attachments: {
        media?: IMediaAttachment[];
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
        media: IMediaAttachment[];
        links?: ILinkAttachment[];
        audios: IAudio[];
    };
    date: string;
    reactions: IReaction[];
    replies: Replies;
    peer: IPeer;
}

export interface IAvatar {
    id: string;
    wrapper: string;
    blurhash: string;
    date: number;
    url?: string;
    type: string;
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
    avatar: IAvatar[];
    cover: IMediaAttachment[];
    verified: boolean;
    status: IStatus;
    followers: {
        count: number;
        is_following: boolean;
    };
    friends: {
        count: number;
        friendship_state: string;
    };
    note: string;
    wallet_uri: string;
    posts: number;
    moments: number;
}

export interface IFriend {
    id: string;
    is_pinned: boolean;
}

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