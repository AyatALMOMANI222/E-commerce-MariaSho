
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})