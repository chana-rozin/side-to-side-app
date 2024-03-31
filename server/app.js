import  express from "express";
import config from "./config.js";
const app = express();
app.use(express.json());

app.use("/users", usersRoute);
app.use("/todos", todosRoute);
app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/albums", albumsRoute);
app.use("/photos", photosRoute);

app.listen(config.port, () => console.log(`listening on port: ${port}`));