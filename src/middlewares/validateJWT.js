const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");
  console.log("token", token);
  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: {
        error: "send request token",
      },
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log("error - validateJWT(): ", error);
    return res.status(401).json({
      ok: false,
      msg: {
        error: "invalid token",
      },
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
