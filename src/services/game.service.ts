import { socket, state } from '@/common/socket'
import type { CreateGameData} from '@/interface/game.interface';

export async function createGame(data: CreateGameData) {
    console.log('create game')
    try {
        const response = await socket.emitWithAck('create-game', data);
        return {
            success: true,
            data: response.data
        }
    }
    catch (error) {
        return {
            succes: false
        }
    }
}

export async function getGame(id: string) {
    console.log('get game')
    try {
        const response = await socket.emitWithAck('get-game', { id });
        return {
            success: true,
            data: response.data
        }
    }
    catch (error) {
        return {
            succes: false
        }
    }
}