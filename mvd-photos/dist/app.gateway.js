"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_service_1 = require("./socket/socket.service");
let AppGateway = class AppGateway {
    constructor(socketService) {
        this.socketService = socketService;
        this.logger = new common_1.Logger('AppGateway');
    }
    afterInit(server) {
        this.socketService.socket = server;
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        for (let i = 0; i < this.socketService.wsClients.length; i++) {
            if (this.socketService.wsClients[i] === client) {
                this.socketService.wsClients.splice(i, 1);
                break;
            }
        }
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.socketService.wsClients.push(client);
        this.socketService.wsClients = Array.from(new Set(this.socketService.wsClients));
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], AppGateway.prototype, "server", void 0);
AppGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [socket_service_1.SocketService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map