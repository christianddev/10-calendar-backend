const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        errors: {
          email: {
            msg: "email in use",
          },
        },
      });
    }
    const salt = bcrypt.genSaltSync(11);
    user = new User(req.body);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    const token = await generateJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log("error - createUser(): ", error);
    res.status(500).json({
      ok: false,
      errors: {
        admin: {
          msg: "contact the administrator",
        },
      },
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        errors: {
          email: {
            msg: "verify email and password",
          },
        },
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        errors: {
          email: {
            msg: "verify email and password",
          },
        },
      });
    }

    const token = await generateJWT(user.id, user.name);
    return res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log("error - loginUser(): ", error);
    res.status(500).json({
      ok: false,
      errors: {
        admin: {
          msg: "contact the administrator",
        },
      },
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);
  return res.status(201).json({
    ok: true,
    token,
    uid,
    name,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
