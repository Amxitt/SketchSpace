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
const client_1 = require("@repo/db/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
let users = [];
app.post("/signup", async (req, res) => {
    const data = types_1.CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            message: "incorrect inputs"
        });
        return;
    }
    const { username, password } = req.body;
    const hashpassword = await bcrypt_1.default.hash(password, 5);
    const response = await client_1.prisma.user.create({
        data: {
            email: username,
            password: hashpassword
        }
    });
    console.log(response); //
});
app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            user = users[i];
        }
    }
    if (!user) {
        res.json({ message: "user does not exists" });
    }
    const token = jsonwebtoken_1.default.sign({ username }, config_1.JWT_SECRET);
    res.json({ token });
});
app.post("/room", auth_1.auth, (req, res) => {
    //dbcall   
    res.json({
        roomId: 123
    });
});
app.listen(4000, () => {
    console.log("running http");
});
