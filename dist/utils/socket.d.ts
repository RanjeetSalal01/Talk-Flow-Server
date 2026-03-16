import { Server } from "socket.io";
import { Server as HttpServer } from "http";
export declare const onlineUsers: Map<string, string>;
export declare const initSocket: (server: HttpServer) => void;
export declare const getIO: () => Server;
//# sourceMappingURL=socket.d.ts.map