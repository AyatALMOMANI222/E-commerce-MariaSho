const express =require ("express")
const auth =require("../middlewear/authentication")
const  {getProfilePictureById,getUserById,createUser,updateUserField,getAllUsers,updateUserById,updateProfilePicture} = require("../controller/register")
const registerRouter = express.Router();
registerRouter.get("/id",auth,getUserById)
registerRouter.post("/",createUser)
registerRouter.put("/field",auth ,updateUserField)
registerRouter.put("/",auth ,updateUserById)
registerRouter.put("/pro",auth ,updateProfilePicture)
registerRouter.get("/",getAllUsers)
registerRouter.get("/profile",auth,getProfilePictureById)

// registerRouter.delete("/:id",deleteUserByID)
module.exports=registerRouter;