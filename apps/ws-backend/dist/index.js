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
        rooms: [],
        ws
    });
    console.log("new ws connection");
    ws.on('message', async function message(data) {
        const parsedData = JSON.parse(data);
        if (parsedData.type === "join_room") {
            try {
                await db_1.prisma.room.create({
                    data: {
                        slug: parsedData.roomId,
                        adminId: userId
                    }
                });
            }
            catch (e) {
                console.log("cannot create room");
            }
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
            console.log("Joining room: ", parsedData.roomId);
            console.log(users);
        }
        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user)
                return;
            user.rooms = user?.rooms.filter(x => x !== parsedData.room);
        }
        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            try {
                await db_1.prisma.chat.create({
                    data: {
                        roomId,
                        message,
                        userId
                    }
                });
            }
            catch (e) {
                console.log(e);
            }
            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
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
