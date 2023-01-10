require("dotenv").config();
const mongoose = require("mongoose");
const { User } = require("./model");
const {
  passwordGen,
  sleep,
  generateToken,
  validateToken,
} = require("../../utils/functions");
const _response = require("../../utils/response");
const bcrypt = require("bcryptjs");
const cryptoJS = require("crypto-js");

module.exports = {
  async auth(req, res) {
    let user = {};
    try {
      const { login, password } = req.body;
      var decrypted = cryptoJS.AES.decrypt(password, "pass");

      const passwordDecripty = decrypted.toString(cryptoJS.enc.Utf8);

      if (login !== undefined && password !== undefined) {
        user = await User.findOne({ networkLogin: { $eq: login } }, [
          "_id",
          "networkLogin",
          "password",
          "name",
          "profilePhoto",
          "email",
          "birthDate",
          "picture",
        ]);

        if (user) {
          var pass = user.password.filter(function (obj) {
            if (
              obj.valid === true &&
              bcrypt.compareSync(passwordDecripty, obj.hash)
            ) {
              return true;
            }

            return false;
          });

          if (pass.length === 0) {
            throw new Error("Senha inválida");
          } else {
            if (
              new Date(pass[0].createdAt).getTime() <
              Date.now() - 90 * 24 * 60 * 60 * 1000
            ) {
              user.passwordValid = false;
            }
          }

          const token = generateToken({
            ref: user._id,
          });

          var tokenEncript = cryptoJS.AES.encrypt(token, login).toString();
          var key = login + ":" + password;
          key = cryptoJS.AES.encrypt(key, password).toString();
          const respUser = {
            passwordValid: user.passwordValid,
            name: user.name,
            profilePhoto: user.profilePhoto,
            networkLogin: user.networkLogin,
            _id: user._id,
            email: user.email,
            birthDate: user.birthDate,
            picture: user.picture,
          };
          _response.success(res, {
            tokenEncript,
            user: respUser,
          });
        } else {
          await sleep(3000);
          _response.forbidden(res, "Usuário ou senha inválidos.");
        }
      } else {
        _response.forbidden(res, "Usuário ou senha não informados");
      }
    } catch (error) {
      await sleep(3000);
      _response.forbidden(res, error.message);
    }
  },

  async create(req, res) {
    try {
      const userValue = new User(req.body);
      await userValue.validate();

      const processedUser = passwordGen(userValue);
      const userFound = await User.findOne({
        $or: [
          { email: processedUser.email },
          { networkLogin: processedUser.networkLogin },
        ],
      });
      if (userFound) {
        return _response.forbidden(res, {
          error: "Usuária ou email já cadastrado",
        });
      }

      await User.create(processedUser);
      return _response.success(res, processedUser);
    } catch (error) {
      let validationErrorKeys;
      let validationError;

      if (error instanceof mongoose.Error.ValidationError) {
        validationErrorKeys = Object.keys(error.errors);
        validationError = validationErrorKeys.map((key) => ({
          [key]: error.errors[key].properties,
        }));
      }

      return _response.internalServer(res, {
        error: !validationError ? "Internal Server Error" : validationError,
      });
    }
  },

  async update(req, res) {
    try {
      const { _id } = req.body;
      const { id } = req.params;
      if (id === _id) {
        const updated = await User.findByIdAndUpdate(_id, req.body);
        return _response.success(res, req.body);
      } else {
        return _response.badRequest(res, "Dados do usuario Divergentes");
      }
    } catch (error) {
      return _response.internalServer(res, error.message);
    }
  },

  async changePassword(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const user = await User.findOne({ _id: id }, ["password"]);
      var Oldpass = user.password.filter(function (obj) {
        if (bcrypt.compareSync(password, obj.hash)) {
          return true;
        }

        return false;
      });
      if (Oldpass.length > 0) {
        _response.unauthorized(
          res,
          "Essa senha já foi utilizada anteriormente, por favor, crie uma nova senha."
        );
        return;
      }

      var salt = bcrypt.genSaltSync(10);
      var hashPass = bcrypt.hashSync(password, salt);

      var newPass = user.password.map(function (item, indice) {
        item.valid = false;
        return item;
      });

      newPass.push({ hash: hashPass, valid: true, createdAt: new Date() });

      await User.findByIdAndUpdate(id, {
        password: newPass,
      });
      _response.success(res, "Senha alterada com sucesso");
    } catch (error) {
      console.log(error);
      return _response.internalServer(res, error.message);
    }
  },

  async delete(req, res) {
    try {
      const { _id } = req.body;
      const deleted = await User.deleteOne({ _id: { $eq: _id } });
      return _response.success(res, deleted);
    } catch (error) {
      return _response.internalServer(res, error.message);
    }
  },

  async isAuthenticated(req, res) {
    try {
      if (await validateToken(req.headers.authorization)) {
        _response.success(res, true);
      } else {
        _response.forbidden(res, false);
      }
    } catch (err) {
      _response.internalServer(res, err);
    }
  },
};
