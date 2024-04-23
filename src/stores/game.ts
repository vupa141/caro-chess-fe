import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {
    CreateGameData,
    CreateMoveData,
    FinishGameData,
    Game,
    Move,
} from '@/interface/game.interface';
import {
    createGameMove,
    createGame as createGameToServer,
    finishGame,
    getGame as getGameFromServer,
} from '@/services/game.service';

export const useGameStore = defineStore('game', () => {
    const game = ref<Game | null>(null);
    const newMove = ref<Move | null>(null);

    const createGame = async (createGameData: CreateGameData) => {
        const result = await createGameToServer(createGameData);
        if (result.success) {
            game.value = result.data;
            return {
                success: true,
            };
        } else {
            return {
                success: false,
            };
        }
    };

    const getGame = async (id: string) => {
        const result = await getGameFromServer(id);
        if (result?.success) {
            game.value = result.data;
            return {
                success: true,
            };
        } else {
            return {
                success: false,
            };
        }
    };

    const createMove = async (moveData: CreateMoveData) => {
        const result = await createGameMove(moveData);
        if (result.success) {
            // game.value = result.data;
            return {
                success: true,
            };
        } else {
            return {
                success: false,
            };
        }
    };

    const completeGame = async (data: FinishGameData) => {
        const result = await finishGame(data);
        if (result.success) {
            game.value = result.data;
            return {
                success: true,
            };
        } else {
            return {
                success: false,
            };
        }
    };

    return { game, createGame, getGame, createMove, completeGame, newMove };
});
