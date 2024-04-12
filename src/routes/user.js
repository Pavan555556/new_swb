const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const validate = require("../middlewares/validate");


 // create user route 
router.post("/createuser", validate.validateUser, user.createUser); 
//get sigle user route
router.get("/:userid", user.getUserById); 
//edit user route
router.put("/:userid", validate.validateUser, user.updateUser); 
//delete user route
router.delete("/:userid", user.deleteUser); 

module.exports = router;
