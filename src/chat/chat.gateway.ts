import { Logger } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  
@WebSocketGateway({
    cors: true
})
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
    users: number = 0;
  
    async handleConnection() {
      // A client has connected
      this.users++;
  
      // Notify connected clients of current users
      this.server.emit('users', this.users);
    }
  
    async handleDisconnect() {
      // A client has disconnected
      this.users--;
  
      // Notify connected clients of current users
      this.server.emit('users', this.users);
    }

    /**
     * Cette fonction est un gestionnaire d'événement qui s'exécute 
     * lorsque le client envoie un message avec l'événement "chat".
     * @param client  représente la connexion client qui a envoyé le message
     * @param message contient les données du message envoyé
     */
  
    @SubscribeMessage('chat')
    async onChat(client, message) {
        client.broadcast.emit('chat', message);
        //Logger.log("message");
    }
  }