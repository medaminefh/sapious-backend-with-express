//import package
require("dotenv/config");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// DB connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("DB failed with err - ", err);
});

//import routes
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/auth.routes");
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//routes middleware
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/auth", authRoutes);

//server listen
const port = 8000;
app.listen(port, () => {
  console.log(`server yemchi jawou mezyan 3al port http://localhost:${port}`);
});
