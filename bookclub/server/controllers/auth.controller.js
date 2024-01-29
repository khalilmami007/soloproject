const RegisterSchema = require("../models/auth.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { firstname, lastname, email, password, confirmPassword } = req.body;

    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const existingUser = await RegisterSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
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

    res.status(201).json({ message: "user registered successfully" });
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