const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PROJECT_SECRET_KEY } = process.env;

module.exports = {
  passwordGen(user) {
    const salt = bcrypt.genSaltSync(10);

    const initialPasswordKey = "1234";
    user.password = [
      {
        hash: bcrypt.hashSync(initialPasswordKey, salt),
        valid: true,
        createdAt: new Date(Date.now()),
      },
    ];

    return user;
  },

  generateToken(obj){
    const token = jwt.sign(
      {
        data: obj,
      },
      PROJECT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return token;
  },

  sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
},
};
