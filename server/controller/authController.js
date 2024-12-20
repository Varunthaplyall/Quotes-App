const bcrypt = require("bcrypt");
const { createToken } = require("../utils/createToken");
const userModel = require("../model/user.model");

const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = createToken({ id: createUser._id });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      id: createUser._id,
      email: createUser.email,
      userName: createUser.userName,
      token: token,
    });
  } catch (error) {
    console.log("Error occurred while creating user:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(400).json({
          sucess: false,
          message: "Invalid Credentials",
        });
      }

      const token = createToken({
        id: user._id,
      });

      return res.status(200).json({
        sucess: true,
        message: "user logged in sucessfully",
        userName: user.userName,
        email: user.email,
        id: user._id,
        token: token,
      });
    }

    res.status(400).json({
      sucess: false,
      message: "invalid credentials",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log("Error ocurred while logging in :", error);
  }
};

module.exports = {
  Login,
  Register,
};
