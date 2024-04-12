const express = require("express")
const transactionController = require('../controllers/transaction')
const transactionRouter = express.Router()

//create(post)
transactionRouter.post("/create",transactionController.create)
//fetchByUserId(get)
transactionRouter.get("/fetch/:userid",transactionController.fetch)

module.exports = transactionRouter