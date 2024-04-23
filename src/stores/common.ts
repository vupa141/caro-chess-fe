import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('common', () => {
    const screenWidth = ref(0)
    const setScreenWidth = (value: number) => {
        screenWidth.value = value;
    }
    return { screenWidth, setScreenWidth };
});
