import { socket } from '@/common/socket';
import type { CreateGameData, CreateMoveData, FinishGameData } from '@/interface/game.interface';

export async function createGame(data: CreateGameData) {
    console.log('create game');
    try {
        const response = await socket.emitWithAck('create-game', data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            succes: false,
        };
    }
}

export async function getGame(id: string) {
    console.log('get game');
    try {
        const response = await socket.emitWithAck('get-game', { id });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            succes: false,
        };
    }
}

export async function createGameMove(data: CreateMoveData) {
    try {
        const response = await socket.emitWithAck('move', data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            succes: false,
        };
    }
}

export async function finishGame(data: FinishGameData) {
    try {
        const response = await socket.emitWithAck('finish', data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            succes: false,
        };
    }
}
