const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PROJECT_SECRET_KEY,TOKEN_EXPIRES_IN } = process.env;
const _response = require("./response");

module.exports = {
  passwordGen(user) {
    const salt = bcrypt.genSaltSync(10);

    const initialPasswordKey = user.password[0] ;
    user.password = [
      {
        hash: bcrypt.hashSync(initialPasswordKey, salt),
        valid: true,
        createdAt: new Date(Date.now()),
      },
    ];

    return user;
  },

  generateToken(obj) {
    const token = jwt.sign(
      {
        data: obj,
      },
      PROJECT_SECRET_KEY,
      {
        expiresIn: TOKEN_EXPIRES_IN ,
      }
    );

    return token;
  },

  sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  },

  ordernation(req) {
    const { orderBy, direction } = req.query;
    let order = "createdAt";
    let sort = "desc";

    if (orderBy) order = orderBy;
    if (direction) sort = direction;

    return { order, sort };
  },

  pagination(req) {
    const { results, page } = req.query;
    let skip = page || 0;
    const limit = results || 10;

    if (skip > 0) {
      skip = limit * page;
    }

    return { skip, limit };
  },

  async validateToken(token) {
    return new Promise((resolve) => {
      try {
        jwt.verify(token, PROJECT_SECRET_KEY, function (err) {
          if (err) {
           resolve(false)
          } else {
            resolve(true)
          }
        });
      } catch (error) {
        resolve(false);
      }
    });
  },

  validateTokenRoute: async (req, res, next) => {
    if (req.headers.authorization !== undefined) {
      const token = req.headers.authorization;
      if (token != null) {
        jwt.verify(token, PROJECT_SECRET_KEY, function (err) {
          if (err) {
            _response.forbidden(res, "Sessão expirada");
          } else {
            next();
          }
        });
      } else {
        _response.badRequest(res, "Sessão expirada!");
      }
    } else {
      _response.badRequest(res, "Sessão expirada!");
    }
  },
};
