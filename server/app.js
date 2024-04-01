import  express from "express";
import 'dotenv/config'
import usersRoute from "./routes/usersRoute.js"
import albumsRoute from "./routes/albumsRoute.js";
import commentsRoute from "./routes/photosRoute.js";
import photosRoute from "./routes/photosRoute.js";
import postsRoute from "./routes/postsRoute.js";
import todosRoute from "./routes/todosRoute.js";
const app = express();
app.use(express.json());

app.use("/users", usersRoute);
app.use("/todos", todosRoute);
app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/albums", albumsRoute);
app.use("/photos", photosRoute);

app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));