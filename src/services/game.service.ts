import { socket } from '@/common/socket';
import type { CreateGameData, CreateMoveData, FinishGameData } from '@/interface/game.interface';

let retryCount = 0;

export async function createGame(data: CreateGameData) {
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
    try {
        const response = await socket.emitWithAck('get-game', { id });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        retryCount += 1;
        if ((error as any)?.message === 'socket has been disconnected' && retryCount < 5) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return getGame(id);
        } else {
            return {
                succes: false,
            };
        }
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

export async function joinGame(gameId: string, userId: string) {
    try {
        const response = await socket.emitWithAck('join-game', { gameId, userId });
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

export async function terminateGame() {
    socket.emit('terminate-game')
}
