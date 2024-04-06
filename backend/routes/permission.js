const express =require("express");
 const addPermission=require("../controller/permission")
const auth = require("../middlewear/authentication")
 const permissionRouter = express.Router();
permissionRouter.post("/",auth, addPermission)
// permissionRouter.post("/:permission_id",auth,checkPermissionAndGetName)


module.exports =permissionRouter;
