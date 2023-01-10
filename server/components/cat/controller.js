require("dotenv").config();
const mongoose = require("mongoose");
const _response = require("../../utils/response");
const { Cat } = require("./model");

module.exports = {
    async getAll(req, res) {
        try {          
            const all = await Cat.find();
            return _response.success(res, all);
          } catch (error) {
            return _response.internalServer(res, error.message);
          }
    }
}