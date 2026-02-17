import  express  from "express";
import jwt from "jsonwebtoken";
import { auth } from "./auth";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, RoomSchema,  } from "@repo/common/types"
import bcrypt from "bcrypt";
import { prisma } from "@repo/db";


const app = express();
app.use(express.json());


app.post("/signup", async (req, res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
         res.json({
            message: "incorrect inputs"
        })
        return;
    }
    const {username , password} = req.body ;
    try{
        const hashpassword = await bcrypt.hash(password, 5);

        await prisma.user.create({
            data: {
                email: username,
                password: hashpassword
            }
        })
        
        res.status(200).json({
            message: "signed up succesfully"
        })
    }catch(e){
        res.json({message: "internal error"})
    }
    
})

app.post("/signin", async (req, res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "incorrect inputs"
        })
        return;
    }

    const { username, password} = req.body;
    try{
        const user = await prisma.user.findFirst({
            where: {
                email: username
            }
        })

        if(!user){
            return res.json({
                message: "user does not exists"
            })
        }
        
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched){
            return res.json({
                message: "invalid credentials"
            })
        }

        const token  = jwt.sign({userId: user?.id},JWT_SECRET);
        res.json({
            token,
            message: "You are signed up"
        })
    }catch(e){
        return res.json({message: "error"})
    }
})

app.post("/room", auth, async (req, res)=>{
    const parsedData = RoomSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.json({
            message: "invalid room id"
        })
    }
     const name = req.body.name;
    const room =  await prisma.room.findFirst({
        where: {
            slug: name
        }
     })

     if(room){
        return res.json({message: "room already exists change the room name"})
     }

     if(!req.userId) return res.json({message: "not authorized"});

     try{
        await prisma.room.create({
            data: {
                slug: name,
                adminId: req.userId
            }
        })

        res.json({message: "room created as" + name});
     }catch(e){
        res.json({message: "error while creating room"})
     }
})


app.listen(4000, ()=>{
    console.log("running http")
})