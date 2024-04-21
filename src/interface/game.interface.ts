import type { GAME_MODE, GAME_STATUS, MOVE_TYPE } from "@/common/constant";

export interface CreateGameData {
    mode: GAME_MODE,
    xPlayer?: string,
    oPlayer?: string
}

export interface Game {
    _id: string,
    status: GAME_STATUS,
    mode: GAME_MODE,
    xPlayer?: string | any,
    oPlayer?: string | any,
    move: Move[]
}

export interface Move {
    timeElapsed: number,
    type: MOVE_TYPE,
    xPosition: number,
    yPosition: number,
}