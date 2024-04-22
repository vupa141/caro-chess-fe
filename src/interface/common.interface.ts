export interface Error {
    errors: { key: string }[];
    message: string;
}

export interface RequestResult {
    success: boolean;
    data?: any;
    error?: Error;
}
