const express = require("express");
const router = express.Router();
const recipesControllers = require("../controllers/recipesControllers");

router.post("/", recipesControllers.createRecipe);

router.get("/", recipesControllers.getAllRecipes);

router.get("/:id", recipesControllers.getRecipeById);

router.put("/:id/update", recipesControllers.getRecipeByIdAndUpdate);

router.delete("/:id", recipesControllers.getRecipeByIdAndRemove);

module.exports = router;
