const express =require("express");
const {getAvailableSizes,addSize,removeSize,getAvailableSizesForProduct}=require("../controller/size")
const auth=require("../middlewear/authentication")
 const sizeRouter = express.Router();
 sizeRouter.get("/",getAvailableSizes)
 sizeRouter.post("/",auth,addSize)
sizeRouter.delete("/:id",removeSize)
sizeRouter.get("/productSize",getAvailableSizesForProduct)

module.exports =sizeRouter;