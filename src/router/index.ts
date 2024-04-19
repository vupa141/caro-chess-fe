import { createRouter, createWebHistory } from 'vue-router'
import Chessboard from '@/views/chessboard/Chessboard.vue'
import Home from '@/views/home/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ]
})

export default router
