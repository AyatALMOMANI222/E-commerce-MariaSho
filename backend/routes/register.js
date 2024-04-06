const express =require ("express")
const auth =require("../middlewear/authentication")
const  {createUser,updateUserField,getAllUsers,deleteUserByID} = require("../controller/register")
const registerRouter = express.Router();
registerRouter.post("/",createUser)
registerRouter.put("/",auth ,updateUserField)
registerRouter.get("/",getAllUsers)
registerRouter.delete("/:id",deleteUserByID)
module.exports=registerRouter;