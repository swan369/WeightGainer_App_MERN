const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  ingredients: { type: String, required: true },
  steps: { type: String, required: true },
  creator: { type: String, required: true },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    // default: new Date(),
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
