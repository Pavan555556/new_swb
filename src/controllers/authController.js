const User = require("../models/users");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please enter all the details" });
  } else {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword, // Store the hashed password
      });

      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
