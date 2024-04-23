<template>
    <div>
        <div
            class="loading-countdown-overlay fixed top-0 left-0 w-screen h-screen z-[9998] bg-gray-900 opacity-15"
            v-if="countDown"
        ></div>
        <div
            class="loading-countdown fixed top-0 left-0 w-screen h-screen z-[9999] flex justify-center items-center"
            v-if="countDown"
        >
            <div class="font-bold text-7xl text-black">{{ countDown }}</div>
        </div>
        <div class="flex justify-center">
            <div class="mr-5">
                <el-button :icon="Back" @click="backToHome" />
            </div>
            <div>
                <GameStatus :xoFlag="xoFlag" :time="time" :isYourTurn="isYourTurn" />
                <Chessboard
                    :xoFlag="xoFlag"
                    @setXoFlag="setXoFlag"
                    :time="time"
                    @resetTime="resetTime"
                    :isYourTurn="isYourTurn"
                    @finishGame="finishGame"
                />
            </div>
        </div>


        <Waiting :openModal="showWaiting" :link="gameUrl" />
        <GuestRegisterDialog
            :openModal="openGuestRegister"
            :showClose="false"
            @success="onGuestRegisterSuccess"
        />
        <BackToHomeConfirm
            :openModal="openBackToHomeConfirm"
            @close="openBackToHomeConfirm = false"
            @terminate="finishGame"
        />
    </div>
</template>

<script setup lang="ts">
import GameStatus from './components/GameStatus.vue';
import Chessboard from './components/Chessboard.vue';
import Waiting from './components/Waiting.vue';
import BackToHomeConfirm from './components/BackToHomeConfirm.vue';
import GuestRegisterDialog from '../auth/GuestRegisterDialog.vue';
import { Back } from '@element-plus/icons-vue';
import { useGameStore } from '@/stores/game';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { ref, onUnmounted, computed, watch } from 'vue';
import { GAME_MODE, GAME_STATUS } from '@/common/constant';
import { ElNotification } from 'element-plus';
import { joinGame } from '@/services/game.service';

const { user } = storeToRefs(useAuthStore());
const { game } = storeToRefs(useGameStore());
const { getGame } = useGameStore();
const xoFlag = ref(0);
const time = ref(60);
const showWaiting = ref(false);
const openGuestRegister = ref(false);
const openBackToHomeConfirm = ref(false);
const pvpGameStarted = ref(false);
let timeInvertal: any = null;
const countDown = ref(0);
const finished = ref(false);
const setXoFlag = () => {
    xoFlag.value = xoFlag.value ? 0 : 1;
};
const resetTime = () => {
    time.value = 60;
    clearInterval(timeInvertal);
    timeInvertal = setInterval(() => {
        time.value--;
        if (time.value === 0) {
            clearInterval(timeInvertal);
        }
    }, 1000);
};
const backToHome = () => {
    if (!finished.value) {
        openBackToHomeConfirm.value = true;
    }
    else {
        router.push('/')
    }
};

const isYourTurn = computed(() => {
    if (user?.value?._id === game.value?.xPlayer?._id) {
        return Boolean(!xoFlag.value);
    } else {
        return Boolean(xoFlag.value);
    }
});

const finishGame = () => {
    time.value = 0;
    clearInterval(timeInvertal);
    finished.value = true;
};

const route = useRoute();
const router = useRouter();

const gameUrl = import.meta.env.VITE_APP_URL + route.fullPath;

const onGuestRegisterSuccess = () => {
    joinGame(game.value?._id as string, user.value?._id as string);
};

getGame(route.params.id as string).then(async () => {
    if (!game.value) {
        ElNotification({
            type: 'error',
            message: 'Game Not Found',
        });
        router.push('/');
        return;
    }
    if (game.value?.status === GAME_STATUS.FINISHED) {
        ElNotification({
            type: 'info',
            message: 'Game Completed',
        });
        router.push('/');
        return;
    }
    if (game.value?.mode === GAME_MODE.PVB) {
        startGame();
    } else {
        if (user.value?._id === game.value?.createdBy) {
            showWaiting.value = true;
        } else if (user.value && user.value._id !== game.value?.createdBy) {
            await joinGame(game.value?._id as string, user.value?._id as string);
        } else if (!user.value) {
            openGuestRegister.value = true;
        }
    }
});

const gameId = computed(() => route.params.id);

watch(gameId, () => {
    window.location.reload();
});

watch(game, (gameValue) => {
    if (
        gameValue?.xPlayer &&
        gameValue?.oPlayer &&
        gameValue.mode === GAME_MODE.PVP &&
        !pvpGameStarted.value
    ) {
        startGame();
        pvpGameStarted.value = true;
        openGuestRegister.value = false;
        showWaiting.value = false;
    }
});

const startGame = () => {
    countDown.value = 3;
    const countDownInterval = setInterval(() => {
        countDown.value--;
        if (!countDown.value) {
            clearInterval(countDownInterval);
        }
    }, 1000);

    setTimeout(() => {
        timeInvertal = setInterval(() => {
            time.value--;
            if (time.value === 0) {
                clearInterval(timeInvertal);
            }
        }, 1000);
    }, 3000);
};

onUnmounted(() => {
    clearInterval(timeInvertal);
});
</script>

<style scoped lang="scss"></style>
