
const express = require('express')
const connection =require("./models/db")
const app = express()
app.use(express.json());
const cors =require("cors");
const port =5000
app.use((cors()))
app.get('/', (req, res) => {
  res.send('Hello World!')
})


const bodyParser = require('body-parser');


// تحديد حجم الحد الأقصى لحجم البيانات المسموح بها
app.use(bodyParser.json({ limit: '10mb' })); // تحديد حجم الحد الأقصى للطلبات بصيغة JSON
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // تحديد حجم الحد الأقصى للطلبات بصيغة urlencoded

// باقي التعليمات الخاصة بتشغيل الخادم





const loginRouter=require("./routes/login")
app.use("/login",loginRouter)

const registerRouter=require("./routes/register")
app.use("/register",registerRouter)

const permissionRouter =require("./routes/permission")
app.use("/per", permissionRouter)

const sizeRouter=require("./routes/size")
app.use("/size",sizeRouter)

const productRouter =require("./routes/product")
app.use("/product",productRouter)
 const cartRouter=require("./routes/cart")
 app.use("/cart",cartRouter)


 const ImageRouter=require("./routes/image")
app.use("/image",ImageRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})