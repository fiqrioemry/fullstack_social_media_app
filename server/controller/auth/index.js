const { User, Profile } = require("../../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const randomAvatar = require("../../utils/randomAvatar");

async function userSignUp(req, res) {
  try {
    const { username, email, password, firstname, lastname } = req.body;

    const existUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (existUser)
      return res.status(400).send({
        success: false,
        message: "Username or Email already registered",
      });
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const avatar = randomAvatar();
    await Profile.create({
      userId: newUser.id,
      firstname,
      lastname,
      avatar,
    });

    return res
      .status(201)
      .send({ success: true, message: "Registration is success" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Registration is failed",
      error: error.message,
    });
  }
}

async function userSignIn(req, res) {
  try {
    const { identifier, password } = req.body;

    const userData = await User.findOne({
      where: { [Op.or]: [{ email: identifier }, { username: identifier }] },
      include: [
        {
          model: Profile,
          attributes: ["avatar"],
        },
      ],
    });

    if (!userData)
      return res.status(404).send({
        success: false,
        message: "User is not found",
      });

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch)
      return res.status(400).send({
        success: false,
        message: "Password is wrong",
      });

    const payload = {
      userId: userData.id,
      userEmail: userData.email,
      userName: userData.username,
      userAvatar: userData.Profile?.avatar,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 7 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).send({
      success: true,
      message: "Login is success",
      data: { accessToken, payload },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Login is failed",
      error: error.message,
    });
  }
}

async function userSignOut(req, res) {
  delete req.headers.authorization;
  res.clearCookie("refreshToken");

  return res.status(200).send({ success: true, message: "Logout is success" });
}

async function userRefreshToken(req, res) {
  try {
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Refresh token is invalid",
      error: error.message,
    });
  }
}
module.exports = { userSignIn, userSignUp, userSignOut, userRefreshToken };
