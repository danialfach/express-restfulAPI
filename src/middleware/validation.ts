import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const accessValidation = (req: any, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;

    if(!authorization){
        res.status(401).json({
            message: "Token is required!"
        });
    }

    const token = authorization[1];
    const secret = process.env.JWT_SECRET!;

    try {
        const jwtDecode = jwt.verify(token, secret);
        req.userData = jwtDecode;
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    next();
}

export default accessValidation;