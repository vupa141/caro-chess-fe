import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { USER_TYPE, MODE } from '../common/constant'

export const useCommonStore = defineStore('common', () => {
    const user = ref<any>(null)
    const appMode = ref<MODE>(MODE.START)
    function setUser(newUser: any) {
        const userData = {
            ...newUser
        }
        if (!userData.avatar) {
            userData.avatar = '/default-avatar/default-avatar-1.svg'
        }
        user.value = userData
    }
    function setAppMode(mode: MODE) {
        appMode.value = mode
    }

    return { user, setUser, appMode, setAppMode }
})

// {
//   username: 'Vu PA',
//   avatar: '/default-avatar/default-avatar-1.svg',
//   type: USER_TYPE.GUEST
// }
