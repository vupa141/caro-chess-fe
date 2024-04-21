import type { USER_STATUS, USER_TYPE } from "@/common/constant"

export interface LoginData {
    email: string
    password: string
}

export interface SignupData {
    email: string
    username: string
    password: string,
    avatar: string
}

export interface User {
    _id?: string,
    email?: string,
    username: string,
    status: USER_STATUS,
    avatar?: string,
    type: USER_TYPE
}