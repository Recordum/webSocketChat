import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { onlineMap } from './onlineMap';
import { Server, Socket } from 'socket.io';
/**
 * namespace -> 
 */
@WebSocketGateway({namespace: /\/ws~.+/})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  
  @WebSocketServer() public server: Server;

  afterInit(server: Server): any {
    console.log('websocketserver init');
  }
  
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  handleConnection(@ConnectedSocket() socket: Socket): any {
    console.log("connected", socket.nsp.name);
    if(!onlineMap[socket.nsp.name]){
      onlineMap[socket.nsp.name] = {};
    }
    socket.emit('hello', socket.nsp.name);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket): any {
    console.log("disconnected", socket.nsp.name);
    const newNamespace = socket.nsp;

    delete onlineMap[socket.nsp.name][socket.id];
    newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
  }


 
}
