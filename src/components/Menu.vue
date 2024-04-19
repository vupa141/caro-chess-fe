<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="h-screen !fixed left-0 top-0 w-[220px]"
        text-color="#fff"
    >
        <div v-if="user" class="flex mt-4 items-center px-4 hover:cursor-pointer hover:opacity-70">
            <el-popover placement="bottom" :width="190" trigger="click" class="user-popover">
                <template #reference>
                    <div class="flex">
                        <div class="bg-white rounded-full">
                            <img
                                :src="user.avatar"
                                alt="user-avatar"
                                class="rounded-full w-[50px] h-[50px] object-cover"
                            />
                        </div>
                        <p class="mt-3 font-bold text-white ml-2">{{ user.username }}</p>
                    </div>
                </template>
                <div>
                    <div
                        class="px-8 py-2 hover:text-blue-400 cursor-pointer"
                        v-if="user.type === USER_TYPE.GUEST"
                    >
                        <el-button type="primary" round>Save Account</el-button>
                    </div>
                    <el-divider class="!my-1" v-if="user.type === USER_TYPE.GUEST"/>
                    <div class="px-8 py-2 hover:text-blue-400 cursor-pointer">
                        <FontAwesomeIcon :icon="faUser" class="mr-2" />
                        My Account
                    </div>
                    <div class="px-8 py-2 hover:text-blue-400 cursor-pointer" @click="logout">
                        <FontAwesomeIcon :icon="faSignOut" class="mr-2" />
                        Log Out
                    </div>
                </div>
            </el-popover>
        </div>
        <div v-else class="flex m-5">
            <el-button type="primary" @click="onOpenAuthDialog">
                <FontAwesomeIcon :icon="faSignIn" class="mr-2" />
                Log In
            </el-button>
        </div>
        <el-divider />
        <el-menu-item index="2">
            <el-icon><HomeFilled /></el-icon>
            <span>Home</span>
        </el-menu-item>
        <el-menu-item index="3" v-if="user">
            <el-icon><Histogram /></el-icon>
            <span>Match History</span>
        </el-menu-item>
        <el-sub-menu index="1">
            <template #title>
                <FontAwesomeIcon :icon="faGamepad" class="mr-2" />
                <span>Start A Game</span>
            </template>
            <el-menu-item index="1-1" @click="playWithFriend">
                <FontAwesomeIcon :icon="faUserFriends" class="mr-2" />
                Play with your friend
            </el-menu-item>
            <el-menu-item index="1-2" @click="playWithRobot">
                <FontAwesomeIcon :icon="faRobot" class="mr-2" />
                Play with robot
            </el-menu-item>
        </el-sub-menu>
        <el-divider />
    </el-menu>
    <AuthDialog :openModal="openAuth" @close="onCloseAuthDialog" />
    <GuestRegisterDialog :openModal="openGuestRegister" @close="onCloseGuestRegister" />
</template>

<script lang="ts" setup>
import { Histogram, HomeFilled } from '@element-plus/icons-vue'
import AuthDialog from '@/views/auth/AuthDialog.vue'
import GuestRegisterDialog from '@/views/auth/GuestRegisterDialog.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ACCESS_TOKEN_KEY, GUEST_ID, USER_TYPE } from '@/common/constant'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faSignOut,
    faUser,
    faSignIn,
    faGamepad,
    faUserFriends,
    faRobot
} from '@fortawesome/free-solid-svg-icons'
import { storeToRefs } from 'pinia'
import Cookies from 'js-cookie'

const { user } = storeToRefs(useAuthStore())
const { getUser, logOut, guestLogIn } = useAuthStore()

const openAuth = ref(false)
const openGuestRegister = ref(false)

const onCloseAuthDialog = () => {
    openAuth.value = false
}

const onCloseGuestRegister = () => {
    openGuestRegister.value = false
}

const onOpenAuthDialog = () => {
    openAuth.value = true
}
const getUserProfile = async () => {
    const guestId = localStorage.getItem(GUEST_ID);
    if (guestId) {
        await guestLogIn();
    }
    else {
        const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
        if (accessToken) {
            await getUser()
        }
    }
}
const logout = () => {
    logOut()
}
const playWithFriend = () => {
    registerGuestIfNotLoggedIn()
}
const playWithRobot = () => {
    registerGuestIfNotLoggedIn()
}
const registerGuestIfNotLoggedIn = () => {
    if (!user.value) {
        openGuestRegister.value = true
    }
}

getUserProfile();

</script>

<style lang="scss">
.user-popover {
    .el-popper {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
}
</style>
