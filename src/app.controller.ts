import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {KafkaProducer} from './microservices/client/kafka-producer';

@Controller()
export class AppController {
    private readonly kafkaProducer = new KafkaProducer();
    constructor(
        private readonly appService: AppService,
    ) {
    }

    @Get()
    getHello(): string {
        this.kafkaProducer.send('test', 'hihihi');
        return this.appService.getHello();
    }
}
