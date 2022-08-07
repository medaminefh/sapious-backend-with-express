//import package
import dotenv from "dotenv";

import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// DB connection
mongoose.connect(process.env.MONGODB_URI!);

mongoose.connection.on("connected", () => {
  console.log("DB connected");
});

mongoose.connection.on("error", (err: Error) => {
  console.log("DB failed with err - ", err);
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//import routes
import storyRoutes from "./routes/story.routes";
import categoryRoutes from "./routes/category.routes";
import tagRoutes from "./routes/tag.routes";
import chapterRoutes from "./routes/chapter.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

//routes middleware
app.use("/stories", storyRoutes);
app.use("/categories", categoryRoutes);
app.use("/tags", tagRoutes);
app.use("/chapters", chapterRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

//server listen
const port: Number = 8000;
app.listen(port, () => {
  console.log(`server yemchi jawou mezyan 3al port http://localhost:${port}`);
});
