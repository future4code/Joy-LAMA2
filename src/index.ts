import dotenv from "dotenv";
import { app } from "./controller/app";
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/showRouter";
dotenv.config();

app.use("/user", userRouter);
app.use("/band", bandRouter);
app.use("/show", showRouter);