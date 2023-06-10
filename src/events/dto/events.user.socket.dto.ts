import { Socket } from 'socket.io';
import { UserGameDto } from './../../user/dto/user.game.dto';

export interface UserSocketDto{
    userGameDto : UserGameDto,
    socket : Socket
}