const mongoose = require("mongoose");

const Register = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: [true, "first name is required"],
      minlength: [2, "first name must be at least 2 characters"],
    },

    lastname: {
      type: String,
      require: [true, "last name is required"],
      minlength: [2, "last name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    },
    
  },
  { timestamps: true }
);

const RegisterSchema=mongoose.model("RegisterSchema",Register)
module.exports =RegisterSchema;
