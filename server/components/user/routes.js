const express = require("express");
const _controller = require("./controller");

module.exports = express
  .Router()
  .post("/auth", _controller.auth)
  .post("/", _controller.create)
  .get("/auth/isAuthenticated", _controller.isAuthenticated)
  .put("/changePassword/:id", _controller.changePassword)
  .put("/auth/:id", _controller.update);
