"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@repo/backend-common/config");
function auth(req, res, next) {
    const token = req.headers["authorization"] ?? "";
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (decoded) {
        //@ts-ignore
        req.username = decoded.username;
    }
    else {
        res.status(403).json({
            message: "Unauthorized"
        });
    }
}
