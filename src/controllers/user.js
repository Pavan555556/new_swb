const User = require("../models/users");

//create user controller

// Controller function to create a user
const createUser = async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  };

const getUserById = async (req, res) => {
    try {
      // Assuming the user ID is passed as a route parameter
      const userid = req.params.userid; 
      if(!userid) {
        res.status(400).json({message : "Invalid Request"});
      }
      const user = await User.findByPk(userid);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
};
  
const updateUser = async (req, res) => {
    try {
      const userid = req.params.userid;
      if(!userid) {
        res.status(400).json({message : "Invalid Request"});
      }
      const userDataToUpdate = req.body; // Assuming request body contains the updated user data
      
      const user = await User.findByPk(userid);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      await user.update(userDataToUpdate);
      
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  };

const deleteUser = async (req, res) => {
    try {
      const userid = req.params.userid;
      if(!userid) {
        res.status(400).json({message : "Invalid Request"});
      }
      const user = await User.findByPk(userid);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  };

module.exports = {createUser, getUserById, updateUser, deleteUser};