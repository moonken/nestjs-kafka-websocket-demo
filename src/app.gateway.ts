import {SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets';
import {Observable, of} from 'rxjs';
import {Socket} from 'socket.io';

@WebSocketGateway({namespace: 'socket'})
export class ApplicationGateway {
    private clients = new Map();

    @SubscribeMessage('response')
    onGreet(client: Socket, payload: any) {
        this.register(client);
        client.emit('response', {
            msg: `received: ${JSON.stringify(payload)}`,
        });
    }

    @SubscribeMessage('hello')
    onEvent(client: Socket, payload: any): Observable<WsResponse<any>> | any {
        this.register(client);
        return of({
            event: 'hello',
            data: {
                msg: `hello ${payload.name}!`,
            },
        });
    }

    private register(client: Socket) {
        if (!this.clients.has(client.id)) {
            this.clients.set(client.id, client);
            console.log(`有一位用户链接!> ${this.clients.size}`, client.id);
            client.on('disconnect', () => {
                console.log(`有一位用户离开了!> ${this.clients.size}`, client.id);
                this.clients.delete(client.id);
            });
        }
    }
}
