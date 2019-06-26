import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern} from '@nestjs/microservices';
import {Message} from 'kafka-node';
import {KafkaProducer} from './microservices/client/kafka-producer';

@Controller()
export class AppController {

    constructor(
        private readonly appService: AppService,
        private readonly kafkaProducer: KafkaProducer,
    ) {
    }

    @Get()
    getHello(): string {
        this.kafkaProducer.send('t', 'hihihi');
        return this.appService.getHello();
    }

    @MessagePattern({topic: 't'})
    showMessage(message: Message): void {
        console.log(message);
    }
}
