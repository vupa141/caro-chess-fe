import { reactive } from "vue";
import { io } from "socket.io-client";
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY } from "./constant";

export const state = reactive({
    connected: false,
    game: {}
});

const URL = import.meta.env.VITE_API_SERVER_URL

export const socket = io(URL, {
    auth: {
        token: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`
    },
});

socket.on("connect", () => {
  state.connected = true;
  console.log('socket connected')
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log('socket disconnected')
});