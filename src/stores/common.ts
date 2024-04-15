import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { ACCOUNT_TYPE, MODE } from '../common/constant';

export const useCommonStore = defineStore('common', () => {
  const user = reactive<any>(null)
  const appMode = ref<MODE>(MODE.START)
  function setUser(user: any) {
    user = user
  }
  function setAppMode(mode: MODE) {
    appMode.value = mode
  }

  return { user, setUser, appMode, setAppMode }
})

// {
//   username: 'Vu PA',
//   avatar: '/default-avatar/default-avatar-1.svg',
//   type: ACCOUNT_TYPE.GUEST
// }
