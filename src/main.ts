import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaServer } from './microservices/server/kafka-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const kafka = await NestFactory.createMicroservice(AppModule, {
      strategy: new KafkaServer(),
  });
  kafka.listen(() => console.log('started'));

}
bootstrap();
