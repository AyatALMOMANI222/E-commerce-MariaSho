const express = require("express");
const { getProductByFilter } = require("../controller/filter");
const filterRouter = express.Router();
filterRouter.get("/", getProductByFilter);
module.exports = filterRouter;
