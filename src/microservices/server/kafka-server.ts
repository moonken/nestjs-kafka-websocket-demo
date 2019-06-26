import {ConsumerGroup, KafkaClient} from 'kafka-node';
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
        const handlers = this.getHandlers();
        const topicToHandler = new Map();

        Array.from(handlers.keys())
            .forEach(pattern => {
                const topic = JSON.parse(pattern).topic;
                if (topic) {
                    topicToHandler.set(topic, handlers.get(pattern));
                }
            });

        const consumer = new ConsumerGroup(
            {
                kafkaHost: 'localhost:9092',
                groupId: 'kafka-node-group',
                autoCommit: true,
                id: 'consumer1',
                fromOffset: 'latest',
            },
            Array.from(topicToHandler.keys()),
        );

        consumer.on('message', (message) => {
            console.log('received: ', message);
            topicToHandler.get(message.topic)(message);
        });

        callback();
    }

    public close() {
        this.client.close(() => {
            console.log('closed');
        });
    }
}
