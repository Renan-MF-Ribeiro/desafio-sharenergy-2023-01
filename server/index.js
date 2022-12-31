const express = require("express");
const {initChallenge} = require("./utils/configChallenge")
const PORT = process.env.PORT || 3001;

const app = express();

const usersRoutes = require("./components/user/routes");

app.use("/api/users", usersRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  initChallenge();
  console.log(`Server listening on ${PORT}`);
});


