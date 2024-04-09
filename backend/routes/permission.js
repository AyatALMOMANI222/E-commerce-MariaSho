const express =require("express");
 const {addPermission,getPermissionByUserId}=require("../controller/permission")
const auth = require("../middlewear/authentication")
 const permissionRouter = express.Router();
permissionRouter.post("/:id", addPermission)
// permissionRouter.post("/:permission_id",auth,checkPermissionAndGetName)
permissionRouter.get("/:id", getPermissionByUserId)


module.exports =permissionRouter;
