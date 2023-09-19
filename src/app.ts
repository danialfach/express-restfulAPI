import express from "express";
import userRoutes from "./routes/users";
import register from "./routes/register";
import login from "./routes/login";
import logs from "./middleware/logs";

const app = express();
const PORT = 4000;

app.use(logs);
app.use(express.json());
app.use('/register', register);
app.use('/login', login)
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.info(`Server running in PORT: ${PORT}`);
})