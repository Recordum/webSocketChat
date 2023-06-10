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

  private connectedClients: Map<string, Socket> = new Map();
  
  constructor(
    private readonly eventsService :EventsService
  ) {}

  afterInit(server: Server) {
    console.dir(server);
    console.log('Socket.io server initialized');
  }

  handleConnection(client: Socket) {
    
    console.log(`Client connected: ${client.id}`);
    const userGameDto: UserGameDto = {
      userName :'mingyu',
      userMMR : 1024,
      nickname :'오민규리',
      userActive : userActiveStatus.INGAME,
      userKeynote: userKeynoteStatus.MALEKEY,
    }
    userGameDto.nickname = "client" + this.connectedClients.size as unknown as string;
    userGameDto.userMMR += this.connectedClients.size;

    this.connectedClients.set(client.id, client);
    
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('chat')
  handleAudioData(client: Socket, message: string) {
    console.log(`Received message from client (${client.id}): ${message}`);

    this.connectedClients.forEach((values, key, obj) => {
      values.emit('chat', message);
    })
  }

 
}
