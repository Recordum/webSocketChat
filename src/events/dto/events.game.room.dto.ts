import { GameRoomStatus } from "../util/events.game.room.status";

export interface GameRoom{
    roomId : number,
    gameRoomStatus : GameRoomStatus
}