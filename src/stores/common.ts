import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MODE } from '../common/constant'

export const useCommonStore = defineStore('common', () => {
    const appMode = ref<MODE>(MODE.START)
    function setAppMode(mode: MODE) {
        appMode.value = mode
    }

    return { appMode, setAppMode }
})

// {
//   username: 'Vu PA',
//   avatar: '/default-avatar/default-avatar-1.svg',
//   type: USER_TYPE.GUEST
// }
