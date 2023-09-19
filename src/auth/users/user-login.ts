import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

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
        res.json({
            data: {
                id: users.id,
                name: users.name,
                address: users.address
            }
        });
    } else {
        res.status(404).json({
            message: "Wrong password!"
        });
    }
};

export default { loginUser };