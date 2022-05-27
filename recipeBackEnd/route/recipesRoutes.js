const express = require("express");
const router = express.Router();
const recipesControllers = require("../controllers/recipesControllers");

router.post("/recipes", recipesControllers.createRecipe);

router.get("/recipes", recipesControllers.getAllRecipes);

router.get("/recipes/:id", recipesControllers.getRecipeById);

router.put("/recipes/:id/update", recipesControllers.getRecipeByIdAndUpdate);

router.delete("/recipes/:id", recipesControllers.getRecipeByIdAndRemove);

module.exports = router;
