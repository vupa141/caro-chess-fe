import type { GAME_MODE, GAME_STATUS, MOVE_TYPE } from '@/common/constant';

export interface CreateGameData {
    mode: GAME_MODE;
    xPlayer?: string;
    oPlayer?: string;
}

export interface CreateMoveData {
    gameId: string;
    type: MOVE_TYPE;
    timeLeft: number;
    xPosition: number;
    yPosition: number;
}

export interface FinishGameData {
    id: string;
    winner: string;
}

export interface Game {
    _id: string;
    status: GAME_STATUS;
    mode: GAME_MODE;
    xPlayer?: string | any;
    oPlayer?: string | any;
    createdBy: string;
}

export interface Move {
    timeElapsed: number;
    type: MOVE_TYPE;
    xPosition: number;
    yPosition: number;
}
