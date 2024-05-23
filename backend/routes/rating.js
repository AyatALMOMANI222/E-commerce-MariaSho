const express =require("express")
const  {getAvgRating,addOrUpdateRating}=require("../controller/rating")
const auth =require("../middlewear/authentication")
const rateRouter =express.Router()
rateRouter.post("/",auth,addOrUpdateRating)
rateRouter.get("/",getAvgRating)


module.exports=rateRouter