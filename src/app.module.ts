import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KafkaProducer} from './kafka-producer';
import {ApplicationGateway} from './app.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KafkaProducer, ApplicationGateway],
})
export class AppModule {}
