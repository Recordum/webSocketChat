import { userActiveStatus } from './../user/utill/user.active.status';
import { GameRoomService } from './events.game.room.service';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserSocketDto } from './dto/events.user.socket.dto';
import { GameRoom } from './dto/events.game.room.dto';

@Injectable()
export class EventsService {
    constructor(
        private gameRoomService: GameRoomService
    ){}

    public userConnection(userSocketDto : UserSocketDto) {
        const emptyRoom : GameRoom = this.gameRoomService.findEmptyRoom();
        this.gameRoomService.addUser(emptyRoom,userSocketDto);
    }   

    public findUsersinRoom(client: Socket): Array<UserSocketDto>{
       return this.gameRoomService.findUsersInRoom(client);

    }
}
