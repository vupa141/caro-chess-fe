import { ref } from 'vue';
import { defineStore } from 'pinia';
import { USER_STATUS, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, GUEST_ID } from '../common/constant';
import {
    getUserProfile,
    guestLogin,
    guestSignUp,
    login,
    register as signup,
    verifyAccount,
} from '@/services/user.service';
import type { LoginData, SignupData, User } from '@/interface/auth.interface';
import type { Error, RequestResult } from '@/interface/common.interface';
import Cookies from 'js-cookie';
import { cloneDeep } from 'lodash';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);

    async function logIn(data: LoginData): Promise<RequestResult> {
        try {
            const loginResult = await login(data);
            const { accessToken, refreshToken, user: userData } = loginResult.data;
            const newUser = cloneDeep(userData);
            if (!newUser.avatar) {
                newUser.avatar = '/default-avatar/default-avatar-1.svg';
            }
            user.value = newUser;
            Cookies.set(ACCESS_TOKEN_KEY, accessToken);
            Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
            localStorage.removeItem(GUEST_ID);
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: error as unknown as Error,
            };
        }
    }

    async function register(data: SignupData): Promise<RequestResult> {
        try {
            await signup(data);
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: error as unknown as Error,
            };
        }
    }

    async function verifyUser(token: string): Promise<RequestResult> {
        try {
            const result = await verifyAccount(token);
            const { accessToken, refreshToken, user: userData } = result.data;
            const newUser = cloneDeep(userData);
            if (!newUser.avatar) {
                newUser.avatar = '/default-avatar/default-avatar-1.svg';
            }
            user.value = newUser;
            Cookies.set(ACCESS_TOKEN_KEY, accessToken);
            Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: error as unknown as Error,
            };
        }
    }

    function setUserStatus(status: USER_STATUS) {
        const userData = cloneDeep(user.value as User);
        userData.status = status;
        user.value = userData;
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
            }
            user.value = newUser;
        } catch (error) {}
    }

    async function guestRegister(username: string) {
        try {
            const result = await guestSignUp(username);
            const { accessToken, refreshToken, user: userData } = result.data;
            const newUser = cloneDeep(userData);
            if (!newUser.avatar) {
                newUser.avatar = '/default-avatar/default-avatar-1.svg';
            }
            user.value = newUser;
            Cookies.set(ACCESS_TOKEN_KEY, accessToken);
            Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
            localStorage.setItem(GUEST_ID, newUser._id);
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: error as unknown as Error,
            };
        }
    }

    async function guestLogIn() {
        try {
            const id = localStorage.getItem(GUEST_ID);
            if (id) {
                const result = await guestLogin(id);
                const { accessToken, refreshToken, user: userData } = result.data;
                const newUser = cloneDeep(userData);
                if (!newUser.avatar) {
                    newUser.avatar = '/default-avatar/default-avatar-1.svg';
                }
                user.value = newUser;
                Cookies.set(ACCESS_TOKEN_KEY, accessToken);
                Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
                return {
                    success: true,
                };
            }
            return { success: false };
        } catch (error) {
            return {
                success: false,
                error: error as unknown as Error,
            };
        }
    }
    return {
        user,
        setUserStatus,
        register,
        logIn,
        logOut,
        getUser,
        verifyUser,
        guestRegister,
        guestLogIn,
    };
});

// {
//   username: 'Vu PA',
//   avatar: '/default-avatar/default-avatar-1.svg',
//   type: USER_TYPE.GUEST
// }
