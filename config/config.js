require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWTSECRET,
  jwtSession: {
    session: false,
  },
};
