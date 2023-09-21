import  Express  from "express";
import userRegister from "../../auth/register";

const registerAuth = Express.Router();

registerAuth.post('/', userRegister.register);

export default registerAuth;