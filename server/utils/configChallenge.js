const { User } = require("../components/user/model");
const { passwordGen } = require("./functions");


// CREATE USER FOR CHALLENGE
async function initChallenge() {
  const userValue = new User({
    createDate: new Date().toISOString(),
    name: "Felipe Freire",
    email: "recrutamento@sharenergy.com.br",
    networkLogin: "desafiosharenergy",
    password: "sh@r3n3rgy",
    birthDate: "20-04-1995",
  });
  await userValue.validate();

  const processedUser = passwordGen(userValue);

  const userFound = await User.findOne({
    $or: [
      { email: processedUser.email },
      { networkLogin: processedUser.networkLogin },
    ],
  });
  if (userFound) {
    return;
  }
  await User.create(processedUser);
}

module.exports= {initChallenge}
