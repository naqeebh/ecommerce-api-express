import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter";
import { errorHandler } from "./middleware/errorHandler";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/users", userRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// must be last:
app.use(errorHandler);


export default app;
