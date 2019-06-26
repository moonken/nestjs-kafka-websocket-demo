import {Module} from '@nestjs/common';
import {KafkaController} from './controller/kafka.controller';

@Module({
    imports: [],
    controllers: [KafkaController],
    providers: [],
})
export class KafkaModule {
}
