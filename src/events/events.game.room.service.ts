
import { Injectable } from '@nestjs/common';
import { UserSocketDto } from './dto/events.user.socket.dto';
import { GameRoomStatus } from './util/events.game.room.status';
import { GameRoom } from './dto/events.game.room.dto';
import { MAXUSER } from './util/events.const';
import { Socket } from 'socket.io';

@Injectable()
export class GameRoomService {
    
    private roomList : Map<GameRoom, Array<UserSocketDto>> = new Map();
    
    // public destroyRoom(roomId: number) {
    //     this.roomList.delete(roomId);
    // }

    public addUser(gameRoom : GameRoom, userSocketDto: UserSocketDto) {
        const userList : Array<UserSocketDto> = this.roomList.get(gameRoom);
        userList.push(userSocketDto);
        if (userList.length >= MAXUSER){
            gameRoom.gameRoomStatus = GameRoomStatus.INGAME;
        }
    }

    public findEmptyRoom() : GameRoom{
        for (const key of this.roomList.keys()) {
            if (key.gameRoomStatus === GameRoomStatus.MATCHING) {
                return key
            }
        }
        return this.createRoom();
    }

    public findUsersInRoom(client: Socket): Array<UserSocketDto>{
        for (const userSocketList of this.roomList.values()) {
            const foundUserSocket = userSocketList.find(userSocket => userSocket.socket === client);
            if (foundUserSocket) {
              return userSocketList;
            }
        }
    }

    private roomCount() : number{
        return this.roomList.size
    }

    private createRoom() : GameRoom{
        const gameRoom : GameRoom = {
            roomId : this.roomCount() + 1,
            gameRoomStatus : GameRoomStatus.MATCHING
        }
        this.roomList.set(gameRoom, new Array());
        return gameRoom;
    }

   

}