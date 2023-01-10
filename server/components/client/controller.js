require("dotenv").config();
const _response = require("../../utils/response");
const { pagination, ordernation } = require("../../utils/functions");
const { Client } = require("./model");

module.exports = {
  async getAll(req, res) {
    try {
      const { skip, limit } = pagination(req);
      const { order, sort } = ordernation(req);
      const searchBy = req.query.search;

      let total = 0;
      total = await Client.find(
        searchBy
          ? {
              $or: [
                { name: { $regex: searchBy, $options: "i" } },
                { email: { $regex: searchBy, $options: "i" } },
                { cpf: { $regex: searchBy, $options: "i" } },
              ],
            }
          : {}
      ).countDocuments();

      const clients = await Client.find(
        searchBy
          ? {
              $or: [
                { name: { $regex: searchBy, $options: "i" } },
                { email: { $regex: searchBy, $options: "i" } },
                { cpf: { $regex: searchBy, $options: "i" } },
              ],
            }
          : {}
      )
        .sort({ [order]: sort })
        .skip(parseInt(skip))
        .limit(parseInt(limit));

      _response.success(res, {
        data: clients,
        total,
      });
    } catch (error) {
      _response.internalServer(res, error.message);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      if (id === req.body._id) {
        const updated = await Client.findByIdAndUpdate(id, req.body);
        return _response.success(res, updated);
      } else {
        return _response.badRequest(res, "Dados do Cliente Divergentes");
      }
    } catch (error) {
      return _response.internalServer(res, error.message);
    }
  },

  async create(req, res) {
    try {
      const clientValue = new Client(req.body);
      await clientValue.validate();

      const clientFound = await Client.findOne({
        $or: [{ cpf: clientValue.cpf }],
      });
      if (clientFound) {
        return _response.forbidden(res, "Cliente já cadastrado");
      }

      await Client.create(clientValue);
      return _response.success(res, clientValue);
    } catch (error) {
      return _response.internalServer(res, "Erro Interno do servidor");
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Client.deleteOne({ _id: id });
      return _response.success(res, deleted);
    } catch (err) {
      return _response.internalServer(res, error.message);
    }
  },
};
