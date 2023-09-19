import { NextFunction, Request, Response } from "express";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.info(`Logging Request in PATH: ${req.path}`);
    next();
};

export default logRequest;