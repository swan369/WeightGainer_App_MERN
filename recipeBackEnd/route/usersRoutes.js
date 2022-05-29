const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");

router.post("/create", usersControllers.createUser);
router.get("/", usersControllers.getAllUsers);
router.put("/update/:id", usersControllers.getUserByIdAndUpdate);
router.delete("/delete/:id", usersControllers.getUserByIdAndDelete);

module.exports = router;
