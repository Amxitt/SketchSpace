"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("./auth");
const config_1 = require("@repo/backend-common/config");
const types_1 = require("@repo/common/types");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("@repo/db");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/signup", async (req, res) => {
    const parsedData = types_1.CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "incorrect inputs"
        });
        return;
    }
    const { username, password } = req.body;
    try {
        const hashpassword = await bcrypt_1.default.hash(password, 5);
        await db_1.prisma.user.create({
            data: {
                email: username,
                password: hashpassword
            }
        });
        res.status(200).json({
            message: "signed up succesfully"
        });
    }
    catch (e) {
        res.json({ message: "internal error" });
    }
});
app.post("/signin", async (req, res) => {
    const parsedData = types_1.CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "incorrect inputs"
        });
        return;
    }
    const { username, password } = req.body;
    try {
        const user = await db_1.prisma.user.findFirst({
            where: {
                email: username
            }
        });
        if (!user) {
            return res.json({
                message: "user does not exists"
            });
        }
        const passwordMatched = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatched) {
            return res.json({
                message: "invalid credentials"
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user?.id }, config_1.JWT_SECRET);
        res.json({
            token,
            username,
            message: "You are signed up"
        });
    }
    catch (e) {
        return res.json({ message: "error" });
    }
});
app.post("/room", auth_1.auth, async (req, res) => {
    const parsedData = types_1.RoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({
            message: "invalid room id"
        });
    }
    const name = req.body.name;
    const room = await db_1.prisma.room.findFirst({
        where: {
            slug: name
        }
    });
    if (room) {
        return res.json({ message: "room already exists change the room name" });
    }
    if (!req.userId) {
        console.log("here not working" + req.userId);
        return res.json({ message: "not authorized" });
    }
    try {
        const room = await db_1.prisma.room.create({
            data: {
                slug: name,
                adminId: req.userId
            }
        });
        res.json({ roomId: room.id });
    }
    catch (e) {
        res.json({ message: "error while creating room" });
        console.log(e);
    }
});
app.get("/chats/:roomId", auth_1.auth, async (req, res) => {
    console.log("yes frontend interacted");
    try {
        const roomId = Number(req.params.roomId);
        const messages = await db_1.prisma.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });
        console.log(messages);
        res.json({ messages });
    }
    catch (e) {
        const messages = {
            "id": 176,
            "roomId": 2,
            "message": "{\"shape\":{\"type\":\"rect\",\"x\":640,\"y\":391,\"width\":240,\"height\":300}}",
            "userId": "755f39a4-bb6e-4cad-9eb1-5dbbc15ecd1f"
        };
        console.log("backend got fucked");
        res.json({ messages });
    }
});
app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    if (typeof slug !== "string") {
        return res.status(400).json({ error: "Invalid slug" });
    }
    const room = await db_1.prisma.room.findFirst({
        where: {
            slug
        }
    });
    const id = room?.id;
    res.json({
        id
    });
});
app.get("/my-rooms", auth_1.auth, async (req, res) => {
    const rooms = await db_1.prisma.room.findMany({
        where: {
            adminId: req.userId
        }
    });
    console.log(rooms);
    res.status(201).json({
        rooms
    });
});
app.delete("/remove/:slug", auth_1.auth, async (req, res) => {
    const slug = req.params.slug;
    if (typeof slug !== "string") {
        return res.status(400).json({ error: "Invalid slug" });
    }
    try {
        await db_1.prisma.$transaction([
            db_1.prisma.chat.deleteMany({
                where: {
                    room: {
                        slug,
                        adminId: req.userId
                    }
                }
            }),
            db_1.prisma.room.delete({
                where: {
                    slug,
                    adminId: req.userId
                }
            })
        ]);
        res.status(200).json({ message: "Room removed successfully" });
    }
    catch (e) {
        res.status(502).json({
            message: "error while deleting"
        });
    }
});
app.listen(4000, () => {
    console.log("running http");
});
