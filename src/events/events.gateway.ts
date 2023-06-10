import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { onlineMap } from './onlineMap';
import { Server, Socket } from 'socket.io';
/**
 * namespace -> 
 */
@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  
  @WebSocketServer() server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  afterInit(server: Server) {
    console.log('Socket.io server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('chat')
  handleChat(client: Socket, message: string) {
    console.log(`Received message from client (${client.id}): ${message}`);
    // 개별 클라이언트에게 메시지 전송
    client.emit('chat', message);
  }

 
}
