const express = require("express");
const planController = require("../controllers/plan");
const planRouter = express.Router();

//create(post)
planRouter.post("/create", planController.create);
//fetchAll(get)
planRouter.get("/fetchAll", planController.fetchAll);

module.exports = planRouter;