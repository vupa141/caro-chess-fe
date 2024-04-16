import { ref } from 'vue'
import { defineStore } from 'pinia'
import { USER_STATUS, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../common/constant'
import { getUserProfile, login, register as signup } from '@/services/user.service'
import type { LoginData, SignupData, User } from '@/interface/auth.interface'
import type { Error, RequestResult } from '@/interface/common.interface'
import Cookies from 'js-cookie'
import { cloneDeep } from 'lodash'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    console.log('init: ', user.value)
    async function logIn(data: LoginData): Promise<RequestResult> {
        try {
            const loginResult = await login(data);
            const {
                accessToken, refreshToken, user: userData
            } = loginResult.data
            const newUser = cloneDeep(userData)
            if (!newUser.avatar) {
                newUser.avatar = '/default-avatar/default-avatar-1.svg';
            };
            user.value = newUser;
            console.log('user: ', user.value)
            Cookies.set(ACCESS_TOKEN_KEY, accessToken)
            Cookies.set(REFRESH_TOKEN_KEY, refreshToken)
            return {
                success: true
            }
        }
        catch (error) {
            return {
                success: false,
                error: error as unknown as Error
            }
        }
    }

    async function register(data: SignupData): Promise<RequestResult> {
        try {
            const registerResult = await signup(data)
            const {
                accessToken, refreshToken, user: userData
            } = registerResult.data
            const newUser = cloneDeep(userData)
            if (!newUser.avatar) {
                newUser.avatar = '/default-avatar/default-avatar-1.svg'
            }
            user.value = newUser
            Cookies.set(ACCESS_TOKEN_KEY, accessToken)
            Cookies.set(REFRESH_TOKEN_KEY, refreshToken)
            return {
                success: true
            }
        }
        catch (error) {
            return {
                success: false,
                error: error as unknown as Error
            }
        }
    }

    function setUserStatus(status: USER_STATUS) {
        const userData = cloneDeep(user.value as User)
        userData.status = status
        user.value = userData
    }

    function logOut() {
        user.value = null;
        Cookies.remove(ACCESS_TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);
    }

    async function getUser() {
        try {
            const result = await getUserProfile();
            const { profile } = result.data;
            const newUser = cloneDeep(profile);
            if (!newUser.avatar) {
                newUser.avatar = '/default-avatar/default-avatar-1.svg';
            };
            user.value = newUser;
            console.log('get user: ', user.value)
        }
        catch (error) {

        }
    }

    return { user, setUserStatus, register, logIn, logOut, getUser }
})

// {
//   username: 'Vu PA',
//   avatar: '/default-avatar/default-avatar-1.svg',
//   type: USER_TYPE.GUEST
// }
