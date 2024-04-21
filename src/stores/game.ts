import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreateGameData, Game } from '@/interface/game.interface'
import { createGame as createGameToServer, getGame as getGameFromServer } from '@/services/game.service';

export const useGameStore = defineStore('game', () => {
    const game = ref<Game | null>(null)

    const createGame = async(createGameData: CreateGameData) => {
        const result = await createGameToServer(createGameData);
        if (result.success) {
            game.value = result.data;
            return {
                success: true
            }
        } else {
            return {
                success: false
            }
        }
    }

    const getGame =  async(id: string) => {
        const result = await getGameFromServer(id)
        if (result.success) {
            game.value = result.data;
            return {
                success: true
            }
        } else {
            return {
                success: false
            }
        }
    }

    return { game, createGame, getGame }
})

