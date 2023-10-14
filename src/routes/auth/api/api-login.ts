import express, { Request, Response } from "express";
import { authorizationUrl } from "../../../auth/API/authorization";

const googleAuthLogin = express.Router();

googleAuthLogin.get('/', (req: Request, res: Response) => {
    res.redirect(authorizationUrl);
});

export default googleAuthLogin;