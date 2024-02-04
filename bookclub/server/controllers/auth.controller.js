const RegisterSchema = require("../models/auth.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await RegisterSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newRegister = new RegisterSchema({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await newRegister.save();

    // Generate a token after successful registration
    const token = jwt.sign({ RegisterId: newRegister._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Login User
exports.login = async (req, res) => {

try{
    const {email, password} = req.body;
    // Check if the user exists
    const Register = await RegisterSchema.findOne({ email });
    if (!Register) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, Register.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a token
    const token = jwt.sign({ RegisterId: Register._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });

}


};

exports.logout = (req, res) => {
    try {
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  module.exports.getCurrentUser = async (req, res) => {
    try {
      console.log('User ID from token:', req.user.id);
      console.log('req.user:', req.user);
  
      const currentUser = await RegisterSchema.findById(req.user.id);
  
      console.log('Retrieved user:', currentUser);
  
      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(currentUser);
    } catch (error) {
      console.error('Error fetching current user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  










