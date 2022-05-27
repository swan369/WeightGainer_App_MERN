const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");

router.post("/create", usersControllers.createUser);
router.get("/login", usersControllers.getAllUsers);
router.put("/update", usersControllers.getUserByIdAndUpdate);
router.delete("/delete/:id", usersControllers.getUserByIdAndDelete);

module.exports = router;
