import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter";
import categoryRouter from "./routers/categoryRouter";
import { errorHandler } from "./middleware/errorHandler";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/users", userRouter);
app.use("/categories", categoryRouter);


app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

export default app;
