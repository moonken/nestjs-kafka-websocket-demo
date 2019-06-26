import {Controller} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {Message} from 'kafka-node';

@Controller()
export class KafkaController {
    @EventPattern({topic: 'test'})
    showMessage(message: Message): void {
        console.log('controller:', message);
    }
}
