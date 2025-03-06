require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(express.json());

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(process.env.PORT, () =>
  console.log('server has started at port ${process.env.PORT}')
);