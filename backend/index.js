const express = require("express");
const connection = require("./models/db");

const app = express();
app.use(express.json());
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.use(express.json({ limit: "50mb" }));


const loginRouter = require("./routes/login");
app.use("/login", loginRouter);
const filterRouter = require("./routes/filter");
app.use("/filter", filterRouter);

const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

const permissionRouter = require("./routes/permission");
app.use("/per", permissionRouter);

const sizeRouter = require("./routes/size");
app.use("/size", sizeRouter);

const productRouter = require("./routes/product");
app.use("/product", productRouter);
const cartRouter = require("./routes/cart");
app.use("/cart", cartRouter);

const ImageRouter = require("./routes/image");
app.use("/image", ImageRouter);

const commentRouter = require("./routes/comment");
app.use("/comment", commentRouter);

const rateRouter = require("./routes/rating");
app.use("/rate", rateRouter);

const orderRouter = require("./routes/order");
app.use("/order", orderRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
