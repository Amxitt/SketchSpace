"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@repo/backend-common/config");
const db_1 = require("@repo/db");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const users = [];
function checkUser(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (typeof decoded == "string") {
            return null;
        }
        if (!decoded || !decoded.userId) {
            return null;
        }
        return decoded.userId;
    }
    catch (e) {
        return null;
    }
}
wss.on('connection', function connection(ws, request) {
    console.log("new ws connection");
    const url = request.url;
    if (!url)
        return;
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') ?? "";
    const userId = checkUser(token);
    if (userId == null) {
        ws.close();
        return;
    }
    users.push({
        userId,
        rooms: new Set(),
        ws
    });
    console.log("new ws connection with token: " + token);
    ws.on('message', async function message(data) {
        const parsedData = JSON.parse(data);
        const roomId = Number(parsedData.roomId);
        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            if (!user?.rooms.has(roomId)) {
                user?.rooms.add(roomId);
            }
        }
        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user)
                return;
            user?.rooms.delete(parsedData.roomId);
            console.log("user just left with id " + user.userId);
        }
        if (parsedData.type === "chat") {
            console.log("yes came here after shape was created");
            const roomId = Number(parsedData.roomId);
            const message = parsedData.message;
            try {
                console.log("room Id is: " + roomId + "message is: " + message);
                await db_1.prisma.chat.create({
                    data: {
                        roomId: roomId,
                        message,
                        userId
                    }
                });
            }
            catch (e) {
                console.log("db is fuckin the shi up");
                console.log(e);
            }
            users.forEach(user => {
                if (user.rooms.has(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }));
                }
            });
        }
    });
});
