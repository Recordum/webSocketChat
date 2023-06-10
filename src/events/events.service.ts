import { GameRoomService } from './events.game.room.service';
import { UserGameDto } from './../user/dto/user.game.dto';
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

}
