import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter";


const app = express();

app.use("/users", userRouter);
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
