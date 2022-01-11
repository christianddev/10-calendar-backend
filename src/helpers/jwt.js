const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(
        { uid, name },
        process.env.SECRET_JWT_SEED,
        {
          expiresIn: "1h",
        },
        (err, token) =>
          err ? reject("the token has not been generated") : resolve(token)
      );
    } catch (error) {
      console.log("error - generateJWT(): ", error);
    }
  });
};

module.exports = {
  generateJWT,
};
