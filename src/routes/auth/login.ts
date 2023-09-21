import Express from "express";
import login from "../../auth/users/user-login";

const loginAuth = Express.Router();

loginAuth.post('/', login.loginUser);

export default loginAuth;