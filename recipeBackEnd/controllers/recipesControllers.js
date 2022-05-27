const Recipe = require("../models/recipe");

const createRecipe = async (req, res) => {
  try {
    const createdRecipe = await Recipe.create(req.body);
    res.status(201).json(createdRecipe); // .json() will send proper headers in response so client knows it's json coming back
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});
    res.status(201).json(allRecipes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const foundRecipe = await Recipe.findById(req.params.id);
    res.status(200).json({ foundRecipe });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getRecipeByIdAndUpdate = async (req, res) => {
  console.log("got into getRecipeById");
  console.log(req.params.id);
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipeByIdAndRemove = async (req, res) => {
  try {
    const removedRecipe = await Recipe.findByIdAndRemove(req.params.id);
    res.status(200).json(removedRecipe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createRecipe = createRecipe;
exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.getRecipeByIdAndUpdate = getRecipeByIdAndUpdate;
exports.getRecipeByIdAndRemove = getRecipeByIdAndRemove;
