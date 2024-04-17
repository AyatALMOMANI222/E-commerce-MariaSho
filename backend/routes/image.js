const express = require("express");
const {addImageArrayByProductId,updateImageByProductId,deleteImageByProductId,getImageByProductId} = require("../controller/image");

const ImageRouter = express.Router();
ImageRouter.post("/:productId", addImageArrayByProductId);
ImageRouter.put("/:productId", updateImageByProductId)
ImageRouter.delete("/:productId",deleteImageByProductId)
ImageRouter.get("/:productId",getImageByProductId)
module.exports = ImageRouter;
