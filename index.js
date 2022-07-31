import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

//Routes
import ProductRoutes from "./routes/product.route.js";

//Initializing the app
const app = express();

//DB connection
mongoose.connect(process.env.MONGODB_URI);

// when db connected
mongoose.connection.on("connected", () => {
  console.log("We're connected");
});

// when there is an error while connecting to db
mongoose.connection.on("error", (err) => {
  console.log("Something wrong");
});

//Read json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", ProductRoutes);

const port = 8000;

//@GET ROUTES
app.get("/", (_, res) => {
  res.send("<h3>Hello there, This is The Home Route</h3>");
});

app.get("/name", (_, res) => {
  res.json("Mohamed Amine Fh");
});

app.get("/age", (_, res) => {
  res.json("25 Years Old");
});

app.listen(port, () => console.log("Server is running on", port));
