// const express = require("express");
// const router = express.Router();
const jwt = require("jwt-simple");
const passport = require("../config/passport");
const config = require("../config/config");
const User = require("../models/users");

const createUser = async (req, res) => {
  let newUser;
  if (req.body.email && req.body.password) {
    newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
  } else {
    res.status(400).json({ error: "incomplete" });
  }
  try {
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      return res.status(400).json({ error: "user already exists" });
    }
    const userPassword = await User.findOne({ password: req.body.password });
    if (userPassword) {
      return res
        .status(400)
        .json({ error: "There was a problem with your login" });
    }
    await User.create(newUser).then((user) => {
      if (user) {
        const payload = {
          id: newUser.id,
        };
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({
          token: token,
          user: user,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//user creation aka sign up with JWT
// const createUser = (req, res) => {
//   if (req.body.email && req.body.password) {
//     console.log("in here 2");
//     let newUser = {
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     };
//     User.findOne({ email: req.body.email }).then((user) => {
//       if (!user) {
//         User.create(newUser).then((user) => {
//           if (user) {
//             console.log("got deeper123");
//             const payload = {
//               id: newUser.id,
//             };
//             const token = jwt.encode(payload, config.jwtSecret);
//             res.json({
//               token: token,
//               user: user,
//             });
//           } else {
//             res.status(400).json({ error: "error !" });
//           }
//         });
//       } else {
//         res
//           .status(400)
//           .json({ message: "user already exists", error: "error !" });
//       }
//     });
//   } else {
//     res.status(400).json({ error: "error !!" });
//   }
// };

// user login
const loginUser = (req, res) => {
  const error = { message: "User can't be found" };
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        if (user.password === req.body.password) {
          const payload = {
            id: user.id,
          };
          const token = jwt.encode(payload, config.jwtSecret);

          res.json({
            token: token,
            user: user,
          });
        } else {
          res.status(400).json({ error: error.message });
        }
      } else {
        res.status(400).json({ error: error.message });
      }
    });
  } else {
    res.status(400).json({ error: error.message });
  }
};

const getUserByIdAndUpdate = async (req, res, next) => {
  try {
    console.log("got into backend");
    console.log(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// module.exports = router;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getUserByIdAndUpdate = getUserByIdAndUpdate;
