import express, { Request, Response } from "express";
import { ouauth2Client } from "../../../auth/API/oauth";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const googleAuthRegister = express.Router();
const prisma = new PrismaClient();

googleAuthRegister.get('/', async (req: Request, res: Response) => {
    const {code} = req.query;

    const {tokens} = await ouauth2Client.getToken(code as string);

    ouauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth: ouauth2Client,
        version: 'v2',
    });

    const {data} = await oauth2.userinfo.get();
    
    if(!data.email || !data.name){
        return res.json({
            data: data,
        });
    }

    let user = await prisma.users.findUnique({
        where: {
            email: data.email  
        }
    });

    if(!user){
        user = await prisma.users.create({
            data: {
                name: data.name,
                email: data.email,
                address: "-",
            }
        });
    }

    const payload = {
        id: user?.id,
        name: user?.name,
        address: user?.address
    };

    const secret = process.env.JWT_SECRET!;

    const expiredIn = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, {expiresIn: expiredIn});

    // return res.redirect(`http://loaclhost:3000/auth-success?token=${token}`)

    return res.json({
        data: {
            id: user.id,
            name: user.name,
            address: user.address
        },
        token: token
    });

});

export default googleAuthRegister;