import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { GameRoomService } from './events.game.room.service';

@Module({
  providers: [EventsGateway, EventsService, GameRoomService],
  controllers: []
})
export class EventsModule {}
