export enum MODE {
    START = 1,
    PLAYING = 2,
}

export enum USER_TYPE {
    GUEST = 'guest',
    NORMAL = 'normal',
}

export enum USER_STATUS {
    UNVERIFIED = 'unverifed',
    VERIFIED = 'verified',
}

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

export const ACCESS_TOKEN_KEY = 'access_token';

export const REFRESH_TOKEN_KEY = 'refresh_token';

export const GUEST_ID = 'guest_id';

export const COMMON_ERROR_MSG = 'An error occurred. Please try again later.';

export const HTTP_STATUS_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

export enum GAME_MODE {
    PVP = 'pvp',
    PVB = 'pvb',
}

export enum GAME_STATUS {
    WAITNG = 'wating',
    PLAYING = 'playing',
    FINISHED = 'finished',
}

export enum MOVE_TYPE {
    X = '0',
    O = '1',
}

export const avatars = [
    '/default-avatar/default-avatar-1.svg',
    '/default-avatar/default-avatar-2.png',
    '/default-avatar/default-avatar-3.webp',
    '/default-avatar/default-avatar-4.png',
];
