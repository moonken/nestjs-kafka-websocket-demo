import {Module} from '@nestjs/common';
import {SocketsCenter} from './sockets-center.service';
import {ApplicationGateway} from './app.gateway';

@Module({
    imports: [],
    providers: [ApplicationGateway, SocketsCenter],
    exports: [SocketsCenter],
})
export class WebSocketModule {
}
