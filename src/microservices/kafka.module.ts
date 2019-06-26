import {Module} from '@nestjs/common';
import {KafkaController} from './controller/kafka.controller';
import {WebSocketModule} from '../websockets/websocket.module';

@Module({
    imports: [WebSocketModule],
    controllers: [KafkaController],
    providers: [],
})
export class KafkaModule {
}
