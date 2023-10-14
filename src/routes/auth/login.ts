import Express from "express";
import login from "../../auth/login";

const loginAuth = Express.Router();

loginAuth.post('/', login.loginUser);

export default loginAuth;