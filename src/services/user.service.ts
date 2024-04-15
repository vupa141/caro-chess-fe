import type { LoginData, SignupData } from '@/interface/auth.interface'
import axiosInstace from '@/common/axios'

export async function register(data: SignupData) {
    return await axiosInstace.post('/user/signup', data)
}

export async function login(data: LoginData) {
    return await axiosInstace.post('/user/login', data)
}

export async function verifyAccount(token: string) {
    return await axiosInstace.post('/user/verify-account', { token })
}

export async function forgotPassword(email: string) {
    return await axiosInstace.post('/user/forgot-password', { email })
}

export async function resetPassword(token: string, password: string) {
    return await axiosInstace.patch('/user/reset-password', { token, password })
}

export async function getAccessToken(refreshToken: string) {
    return await axiosInstace.post('/user/access-token', { refreshToken })
}

export async function getUserProfile() {
    return await axiosInstace.get('/user/profile')
}

export async function guestSignUp(username: string) {
    return await axiosInstace.post('/user/guest-signup', { username })
}

export async function guestLogin(id: string) {
    return await axiosInstace.post('/user/guest-login', { id })
}

export async function updateUserType() {
    return await axiosInstace.patch('/user/update-type')
}
