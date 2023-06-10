import { UserSocketDto } from './dto/events.user.socket.dto';
import { EventsService } from './events.service';
import { UserGameDto} from './../user/dto/user.game.dto';
import * as Pitchfinder from "pitchfinder";
import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { onlineMap } from './onlineMap';
import { Server, Socket } from 'socket.io';
import { userActiveStatus } from 'src/user/utill/user.active.status';
import { userKeynoteStatus } from 'src/user/utill/user.keynote.status';
import { Inject } from '@nestjs/common';

/**
 * namespace -> 
 */
@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  
  @WebSocketServer() server: Server;
  
  constructor(
    private readonly eventsService :EventsService
  ) {}

  afterInit(server: Server) {
    console.dir(server);
    console.log('Socket.io server initialized');
  }

  handleConnection(client: Socket) {
    //실제 운영할때는 클라이언트에쪽에서 보낼정보들.
    console.log(`Client connected: ${client.id}`);
    const userGameDto: UserGameDto = {
      userName :'mingyu',
      userMMR : 1024,
      nickname :'오민규리',
      userActive : userActiveStatus.INGAME,
      userKeynote: userKeynoteStatus.MALEKEY,
    }

    userGameDto.nickname = "client" + 1 as unknown as string;
    userGameDto.userMMR += 100;
  
    const userSocketDto :UserSocketDto = {
      userGameDto : userGameDto,
      socket : client
    }
    //
    this.eventsService.userConnection(userSocketDto);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chat')
  handleAudioData(client: Socket, message: string) {
    console.log(`Received message from client (${client.id}): ${message}`);

    const usersWithSameRoom = this.eventsService.message(client);
    for(const user of usersWithSameRoom){
      user.socket.emit('chat', message);
    }
  }

 
}
