
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";

interface JWTPayload {
  userId: string;
}


export function auth (req:Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";
    console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    console.log(decoded);
    if(decoded){
        req.userId = decoded.userId ;
        next();
    }else{
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}