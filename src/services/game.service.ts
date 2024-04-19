import { socket, state } from '@/common/socket'
import type { CreateGame } from '@/interface/game.interface';

export async function createGame(data: CreateGame) {
    console.log('create game')
    try {
        const response = await socket.emitWithAck('create-game', data);
        console.log('socket success: ', response.data)       
    }
    catch (error) {
        console.log('socket error: ', error)
    }
}