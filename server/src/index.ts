import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import cors from "cors";
import postRouter from "./routes/post";
import voteRouter from "./routes/vote";
import commentRouter from "./routes/comment";
import domainRouter from "./routes/domain";
import followRouter from "./routes/follow";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/vote", voteRouter);
app.use("/api/comment", commentRouter);
app.use("/api/domain", domainRouter);
app.use("/api/follow", followRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
