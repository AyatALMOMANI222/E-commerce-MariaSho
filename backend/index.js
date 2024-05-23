const express = require("express");
const connection = require("./models/db");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser'); // تأكد من إضافة body-parser
const app = express();
app.use(express.json());
const cors = require("cors");
const port = 5000;
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json({ limit: '50mb' }));




// إعداد Multer لتخزين الملفات
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // تحديد مجلد التخزين
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // تسمية الملفات بشكل فريد
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }  // تحديد الحد الأقصى لحجم الملف 50MB
});

app.use('/uploads', express.static('uploads'));  // إعداد مجلد الملفات الثابتة

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);
const filterRouter=require("./routes/filter")
app.use("/filter",filterRouter)
const Router = require("./routes/minio");
app.use("/minio", Router);
const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

const permissionRouter = require("./routes/permission");
app.use("/per", permissionRouter);

const sizeRouter = require("./routes/size");
app.use("/size", sizeRouter);

const productRouter = require("./routes/product");
app.use("/product",upload.single('image'), productRouter);
const cartRouter = require("./routes/cart");
app.use("/cart", cartRouter);

const ImageRouter = require("./routes/image");
app.use("/image", ImageRouter);

const commentRouter =require("./routes/comment")
app.use("/comment", commentRouter)

const rateRouter =require("./routes/rating")
app.use("/rate", rateRouter)

const orderRouter =require("./routes/order")
app.use("/order" , orderRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
