const express = require("express");
const _controller = require("./controller");

module.exports = express.Router()
    .get("/", _controller.getAll)
    .put("/:id", _controller.update)
    .post("/", _controller.create)
    .delete("/:id",_controller.delete)