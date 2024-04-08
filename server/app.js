import express from "express";
import 'dotenv/config';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import usersRouter from "./routes/usersRoute.js";
import albumsRouter from "./routes/albumsRoute.js";
import commentsRouter from "./routes/commentsRoute.js";
import photosRouter from "./routes/photosRoute.js";
import postsRouter from "./routes/postsRoute.js";
import todosRouter from "./routes/todosRoute.js";
import loginRouter from "./routes/loginRoute.js";
import registerRouter from "./routes/registerRoute.js";
import cors from "cors";
import authenticateToken from "./middleware/authenticateToken.js";

const app = express();

const accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
// Other middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use(authenticateToken);
app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/albums", albumsRouter);
app.use("/photos", photosRouter);

// Starting the server
app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));
