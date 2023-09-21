import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const users = await prisma.users.findUnique({
        where: {
            email: email
        }
    });

    if(!users){
        return res.status(404).json({
            message: "User not found"
        });
    }

    if(!users.password){
        return res.status(404).json({
            message: "Password not set"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, users.password);

    if(isPasswordValid){
        const payload = {
            id: users.id,
            name: users.name,
            address: users.address
        };

        const secret = process.env.JWT_SECRET!;

        const expiredIn = 60 * 60 * 1;

        const token = jwt.sign(payload, secret, {expiresIn: expiredIn});

        res.json({
            data: {
                id: users.id,
                name: users.name,
                address: users.address
            },
            token: token
        });
    } else {
        res.status(404).json({
            message: "Wrong password!"
        });
    }
};

export default { loginUser };