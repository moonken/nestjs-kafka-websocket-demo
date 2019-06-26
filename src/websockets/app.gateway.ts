import {SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets';
import {Observable, of} from 'rxjs';
import {Socket} from 'socket.io';
import {SocketsCenter} from './sockets-center.service';

@WebSocketGateway({namespace: 'socket'})
export class ApplicationGateway {
    @SubscribeMessage('response')
    onGreet(client: Socket, payload: any) {
        SocketsCenter.register(client);
        client.emit('response', {
            message: `received: ${JSON.stringify(payload)}`,
        });
    }

    @SubscribeMessage('hello')
    onEvent(client: Socket, payload: any): Observable<WsResponse<any>> | any {
        SocketsCenter.register(client);
        return of({
            event: 'hello',
            data: {
                message: `hello ${payload.name}!`,
            },
        });
    }
}
