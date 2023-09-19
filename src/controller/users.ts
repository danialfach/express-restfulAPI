import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const createNewUser = async (req: Request,res: Response) => {
    const {name,email,address} = req.body;
    const result = await prisma.users.create({
        data: {
            name: name,
            email: email,
            address: address
        }
    });
    res.json({
        data:result,
        message: "Created user success"
    });
};

const getUser = async (req: Request, res: Response) => {
    const result = await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            address: true
        }
    });
    res.json({
        data: result,
        message: "Get data user success"
    });
};

const updateUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    
    const {name, email, address} = req.body;
    const result = await prisma.users.update({
        data: {
            name: name,
            email: email,
            address: address
        },
        where: {
            id: Number(id)
        }
    });
    res.json({
        data: result,
        message: `User ${id} updated`
    });
};

const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    const result = await prisma.users.delete({
        where: {
            id: Number(id)
        }
    });
    res.json({
        data: result,
        message: `User ${id} deleted`
    });
};


export default {
    createNewUser,
    getUser,
    updateUser,
    deleteUser
}