const express = require("express");
const {
  getUserRating,
  getAvgRating,
  addOrUpdateRating,
} = require("../controller/rating");
const auth = require("../middlewear/authentication");
const rateRouter = express.Router();
rateRouter.post("/", auth, addOrUpdateRating);
rateRouter.get("/user/:product_id", auth, getUserRating);
rateRouter.get("/:product_id", getAvgRating);

module.exports = rateRouter;
