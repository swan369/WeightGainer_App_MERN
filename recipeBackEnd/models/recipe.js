const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  category: { type: String, required: true, min: 3 },
  title: { type: String, required: true, min: 3 },
  imageURL: { type: String, required: true, min: 3 },
  ingredients: { type: String, required: true, min: 3 },
  steps: { type: String, required: true, min: 3 },
  creator: { type: String, required: true, min: 2, max: 10 },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    // immutable: true,
    // default: new Date(),
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
