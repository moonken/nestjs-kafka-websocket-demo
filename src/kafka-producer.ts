import {HighLevelProducer, KafkaClient} from 'kafka-node';
import {Injectable, OnModuleDestroy} from '@nestjs/common';

@Injectable()
export class KafkaProducer implements OnModuleDestroy {
    private client: KafkaClient;
    private producer: HighLevelProducer;
    private isReady: boolean;
    private cachedPayloads = [];

    constructor() {
        console.log('producer created');
        this.client = new KafkaClient({kafkaHost: 'localhost:9092'});
        this.producer = new HighLevelProducer(this.client);
        this.producer.on('ready',  () => {
            this.isReady = true;
            this.producer.send(this.cachedPayloads, (err) => {
                if (err) {
                    console.error(err);
                }
                this.cachedPayloads = [];
            });
        });

        this.producer.on('error', (err) => {
            console.error(err);
        });
    }

    onModuleDestroy(): any {
        this.client.close();
    }

    public send(topic: string, message: string) {
        if (this.isReady) {
            this.producer.send([{topic, messages: message}], (err) => {
                if (err) {
                    console.error(err);
                }
            });
        } else {
            this.cachedPayloads.push({ topic, messages: message});
        }
    }
}
