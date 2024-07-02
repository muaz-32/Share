import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
