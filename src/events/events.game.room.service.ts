
import { Injectable } from '@nestjs/common';
import { UserSocketDto } from './dto/events.user.socket.dto';
import { GameRoomStatus } from './util/events.game.room.status';
import { GameRoom } from './dto/events.game.room.dto';

@Injectable()
export class GameRoomService {

    private roomList : Map<GameRoom, Array<UserSocketDto>> = new Map();
    
    public createRoom() : Object{
        this.roomList.set<>;
        return this.roomList
    }

    public destroyRoom(roomId: number) {
        this.roomList.delete(roomId);
    }

    public addUser(roomId: number, userSocketDto: UserSocketDto) {
        this.roomList.get(roomId).push(userSocketDto);
    }

    public roomCount() : number{
        return this.roomList.size
    } 

}