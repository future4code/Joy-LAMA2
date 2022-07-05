import dotenv from "dotenv";
import { app } from "./controller/app";
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";
dotenv.config();

app.use("/user", userRouter);
app.use("/band", bandRouter);
