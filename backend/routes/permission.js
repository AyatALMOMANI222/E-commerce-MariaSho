const express = require("express");
const {
  addPermission,
  getPermissionByUserId,
} = require("../controller/permission");
const auth = require("../middlewear/authentication");
const permissionRouter = express.Router();
permissionRouter.post("/:id", addPermission);
permissionRouter.get("/:id", getPermissionByUserId);

module.exports = permissionRouter;
