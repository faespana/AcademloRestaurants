const jwt = require('jsonwebtoken');

const generateJWT = id => {
  console.log(process.env.SECRET_JWT_SEED);
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: process.env.JWT_EXPIRE_IN },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
