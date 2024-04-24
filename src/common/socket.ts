import { reactive } from 'vue';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import {
    ACCESS_TOKEN_KEY,
    COMMON_ERROR_MSG,
    GAME_STATUS,
    HTTP_STATUS_CODE,
    REFRESH_TOKEN_KEY,
} from './constant';
import { ElNotification } from 'element-plus';
import { getAccessToken } from '@/services/user.service';
import { useAuthStore } from '@/stores/auth';
import { useGameStore } from '@/stores/game';
import { storeToRefs } from 'pinia';

export const state = reactive({
    connected: false,
    game: {},
});

const URL = import.meta.env.VITE_API_SERVER_URL;

export const socket = io(URL, {
    auth: {
        token: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
    transports: ['websocket', 'polling', 'flashsocket']
});

socket.on('connect', () => {
    state.connected = true;
    console.log('socket connected');
});

socket.on('disconnect', () => {
    state.connected = false;
    console.log('socket disconnected');
});

socket.on('game-started', (data) => {
    const { game } = storeToRefs(useGameStore());
    game.value = data;
});

socket.on('opponent-move', (data) => {
    const { newMove } = storeToRefs(useGameStore());
    newMove.value = data;
});

socket.on('opponent-quit', () => {
    const { game } = storeToRefs(useGameStore());
    if (game.value) {
        game.value = {
            ...game.value,
            status: GAME_STATUS.FINISHED,
        };
    }
});

socket.on('exception', async (err) => {
    if (err.code === HTTP_STATUS_CODE.UNAUTHORIZED) {
        const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
        try {
            const accessTokenResult = await getAccessToken(refreshToken as string);
            Cookies.set(ACCESS_TOKEN_KEY, accessTokenResult.data.accessToken);
            (socket.auth as any).token = `Bearer ${accessTokenResult.data.accessToken}`;
            socket.disconnect().connect();
            ElNotification({
                type: 'error',
                message: COMMON_ERROR_MSG,
            });
        } catch (error) {
            ElNotification({
                type: 'error',
                message: 'Login session has expired, Please login again.',
            });
            const { logOut } = useAuthStore();
            logOut();
        }
    } else {
        ElNotification({
            type: 'error',
            message: COMMON_ERROR_MSG,
        });
    }
});
