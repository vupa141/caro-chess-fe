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
