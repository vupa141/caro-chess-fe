import { EMAIL_REGEX, PASSWORD_REGEX } from "./constant";

export const validateEmail = (value: string) => {
    if (!value) {
        return 'Email is required';
    }
    if (!EMAIL_REGEX.test(value)) {
        return 'Please enter a valid email';
    }
    return true;
}

export const validatePassword = (value: string) => {
    if (!value) {
        return 'Password is required';
    }
    if (!PASSWORD_REGEX.test(value)) {
        return 'Password must be at least 8 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character';
    }
    return true;
}

export const validateName = (value: string) => {
    if (!value) {
        return 'Display name is required';
    }
    return true;
}