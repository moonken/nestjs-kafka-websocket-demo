import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaServer } from './microservices/server/kafka-server';
import {KafkaModule} from './microservices/kafka.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const kafka = await NestFactory.createMicroservice(KafkaModule, {
      strategy: new KafkaServer(),
  });
  kafka.listen(() => console.log('started'));

}
bootstrap();
