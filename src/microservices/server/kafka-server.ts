import {KafkaClient, KeyedMessage, Producer, HighLevelProducer, Consumer, ConsumerGroup} from 'kafka-node';
import {CustomTransportStrategy, Server} from '@nestjs/microservices';

export class KafkaServer extends Server implements CustomTransportStrategy {
    private client: KafkaClient;

    constructor() {
        super();
        this.client = new KafkaClient({kafkaHost: 'localhost:9092'});
    }

    public listen(callback: () => void) {
        this.start(callback);
    }

    public start(callback?: () => void) {
        let handlers = this.getHandlers();
        const keys = Array.from(handlers.keys())
            .filter(pattern => JSON.parse(pattern).topic);

        const consumer = new ConsumerGroup(
            {
                kafkaHost: 'localhost:9092',
                groupId: 'kafka-node-group',
                autoCommit: true,
                id: 'consumer1',
                fromOffset: 'latest',
            },
            keys.map(pattern => JSON.parse(pattern).topic),
        );

        consumer.on('message',  (message) => {
            console.log(message);
            handlers.get(JSON.stringify({topic: message.topic}))(message);
        });

        callback();
    }

    public close() {
        this.client.close(() => {
            console.log('closed');
        });
    }
}
