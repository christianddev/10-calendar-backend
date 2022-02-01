const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(400).json({
      ok: false,
      errors: {
        token: {
          msg: "send request token",
        },
      },
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.error("validateJWT: ", error?.name, error?.message);
    return res.status(401).json({
      ok: false,
      errors: {
        token: {
          msg: "invalid token",
        },
      },
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
