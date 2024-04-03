import  express from "express";
import 'dotenv/config'
import usersRouter from "./routes/usersRoute.js"
import albumsRouter from "./routes/albumsRoute.js";
import commentsRouter from "./routes/commentsRoute.js";
import photosRouter from "./routes/photosRoute.js";
import postsRouter from "./routes/postsRoute.js";
import todosRouter from "./routes/todosRoute.js";
import loginRouter from "./routes/loginRoute.js"
import authenticateToken from "./middleware/authenticateToken.js";
const app = express();
app.use(express.json());

app.use("/login", loginRouter)

app.use(authenticateToken);
app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/albums", albumsRouter);
app.use("/photos", photosRouter);


app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));