import {Socket} from 'socket.io';

export class SocketsCenter {
    private static clients = new Map();

    public static register(client: Socket) {
        if (!this.clients.has(client.id)) {
            this.clients.set(client.id, client);
            console.log(`有一位用户加入!> ${this.clients.size}`, client.id);
            client.broadcast.emit('response', {message: `${client.id} joined`});
            client.on('disconnect', () => {
                this.clients.delete(client.id);
                console.log(`有一位用户离开了!> ${this.clients.size}`, client.id);
            });
        }
    }

    public static broadcast(message: string) {
        this.clients.forEach(client => {
            client.emit('response', {message});
        });
    }
}
