const path = require('path');
const express = require("express");
const { initChallenge } = require("./utils/configChallenge");
const { validateTokenRoute } = require("./utils/functions");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(
  bodyParser.json({
    limit: "100mb",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const usersRoutes = require("./components/user/routes");
const CatsRoutes = require("./components/cat/routes");
const ClientsRoutes = require("./components/client/routes");

app.use("/api/users", usersRoutes);
app.use("/api/cats", validateTokenRoute, CatsRoutes);
app.use("/api/clients", validateTokenRoute, ClientsRoutes);
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  initChallenge();
  console.log(`Server listening on ${PORT}`);
});
