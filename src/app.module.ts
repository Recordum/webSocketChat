import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GameModule } from './game/game.module';
import { GameService } from './game/game.service';

@Module({
  imports: [
    UserModule, EventsModule, GameModule,
  ],
  controllers: [AppController],
  providers: [AppService, GameService],
})
export class AppModule {}
