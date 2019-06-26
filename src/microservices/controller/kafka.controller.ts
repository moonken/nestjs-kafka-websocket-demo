import {Controller} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {Message} from 'kafka-node';
import {SocketsCenter} from '../../websockets/sockets-center.service';

@Controller()
export class KafkaController {

    @EventPattern({topic: 'test'})
    showMessage(message: Message): void {
        SocketsCenter.broadcast(message.value.toString());
        console.log('controller:', message);
    }
}
