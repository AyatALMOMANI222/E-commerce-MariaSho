const express = require("express");
const {
  getCommentByProductId,
  updateProductById,
  addComment,
  deleteCommentByCommentId,
} = require("../controller/comment");
const auth = require("../middlewear/authentication");
const commentRouter = express.Router();
commentRouter.post("/", auth, addComment);
commentRouter.delete("/", auth, deleteCommentByCommentId);
commentRouter.put("/", auth, updateProductById);
commentRouter.get("/:id", getCommentByProductId);

module.exports = commentRouter;
