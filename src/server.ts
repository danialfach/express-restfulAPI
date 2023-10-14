import express, { Request, Response } from "express";
import userRoutes from "./routes/users";
import register from "./routes/auth/register";
import login from "./routes/auth/login";
import logs from "./middleware/logs";
import validation from "./middleware/validation";
import googleAuthLogin from "./routes/auth/api/api-login";
import googleAuthRegister from "./routes/auth/api/api-register";

const app = express();
const PORT = 4000;

app.use(logs);
app.use(express.json());

app.get('/auth/google', googleAuthLogin);
app.get('/auth/google/callback', googleAuthRegister);

app.use('/register', register);
app.use('/login', login)
app.use('/users', validation, userRoutes);

app.listen(PORT, () => {
    console.info(`Server running in: http://localhost:${PORT}`);
})