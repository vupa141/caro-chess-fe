export enum MODE {
    START = 1,
    PLAYING = 2
}

export enum USER_TYPE {
    GUEST = 'guest',
    NORMAL = 'normal'
}

export enum USER_STATUS {
    UNVERIFIED = 'unverifed',
    VERIFIED = 'verified'
}

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/

export const ACCESS_TOKEN_KEY = 'access_token'

export const REFRESH_TOKEN_KEY = 'refresh_token'

export const HTTP_STATUS_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}