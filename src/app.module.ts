import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KafkaProducer} from './kafka-producer';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KafkaProducer],
})
export class AppModule {}
