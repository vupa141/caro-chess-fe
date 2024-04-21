<template>
    <div
        class="loading-countdown-overlay fixed top-0 left-0 w-screen h-screen z-[9998] bg-gray-900 opacity-15"
        v-if="countDown">
    </div>
    <div
        class="loading-countdown fixed top-0 left-0 w-screen h-screen z-[9999] flex justify-center items-center"
        v-if="countDown">
        <div class="font-bold text-7xl text-black">{{ countDown }}</div>
    </div>
   
    <GameStatus
        :xoFlag="xoFlag"
        :time="time"
        :isYourTurn="isYourTurn"
    />
    <Chessboard
        ref="chessboardRef"
        :xoFlag="xoFlag"
        @setXoFlag="setXoFlag"
        :time="time"
        @resetTime="resetTime"
        :isYourTurn="isYourTurn"
        @finishGame="finishGame"
    />
</template>

<script setup lang="ts">
import GameStatus from './components/GameStatus.vue';
import Chessboard from './components/Chessboard.vue';
import { useGameStore } from '@/stores/game';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref, onUnmounted, computed } from 'vue';

const { user } = storeToRefs(useAuthStore());
const { game } = storeToRefs(useGameStore());
const { getGame } = useGameStore();
const chessboardRef = ref(null);
const xoFlag = ref(0)
const time = ref(60)
let timeInvertal: any = null
const countDown = ref(3)
const setXoFlag = () => {
    xoFlag.value = xoFlag.value ? 0 : 1
}
const resetTime = () => {
    time.value = 60;
    clearInterval(timeInvertal);
    timeInvertal = setInterval(() => {
        time.value --;
        if (time.value === 0) {
            clearInterval(timeInvertal)
        }
    }, 1000)
}
const isYourTurn = computed(() => {
    if (user?.value?._id === game.value?.xPlayer?._id) {
        return Boolean(!xoFlag.value)
    }
    else {
        return Boolean(xoFlag.value)
    }
});

const finishGame = () => {
    time.value = 0;
    clearInterval(timeInvertal)
}

getGame(useRoute().params.id as string)

const countDownInterval = setInterval(() => {
    countDown.value --;
    if (!countDown.value) {
        clearInterval(countDownInterval)
    }
}, 1000)

setTimeout(() => {
    timeInvertal = setInterval(() => {
        time.value --;
        if (time.value === 0) {
            clearInterval(timeInvertal)
        }
    }, 1000)
}, 3000)

onUnmounted(() => {
    clearInterval(timeInvertal)
})
</script>

<style scoped lang="scss"></style>