import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {KafkaProducer} from './kafka-producer';

@Controller()
export class AppController {

    constructor(
        private readonly appService: AppService,
        private readonly kafkaProducer: KafkaProducer,
    ) {
    }

    @Get()
    getHello(): string {
        this.kafkaProducer.send('test', 'hihihi');
        return this.appService.getHello();
    }
}
