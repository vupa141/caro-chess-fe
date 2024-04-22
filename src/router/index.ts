import { createRouter, createWebHistory } from 'vue-router';
import Game from '@/views/game/Game.vue';
import Home from '@/views/home/Home.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/game/:id',
            name: 'game',
            component: Game,
        },
    ],
});

export default router;
