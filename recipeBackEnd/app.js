const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.static("public"));
const mongoose = require("mongoose");
const usersRoutes = require("./route/usersRoutes");
const recipesRoutes = require("./route/recipesRoutes");
// const cors = require("cors");

app.use(express.json());

// one way of getting rid of CORS and..
// to connect frontend of localhost3000 and backend localhost3003
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  next();
});

//*** make sure "/" is there and route elements also have "/" to start even it appears like duplicate
// Ensure this middleware comes after whitelist CORs
app.use("/users/", usersRoutes);
app.use("/recipes/", recipesRoutes);

mongoose.connect(
  `mongodb+srv://${process.env.userNamePw}@cluster0.1t4x2.mongodb.net/recipes`,
  {
    useNewUrlParser: true,
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("listening at port: ", port);
});

// Another way of to handle CORs error
// const whitelist = [
//   "http://localhost:3000",
//   "https://fathomless-sierra-68956.herokuapp.com",
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

// app.get("/recipes", (req, res) => {
//   res.json({ message: dummy_recipes });
// });

// app.post("/recipes", async (req, res) => {
//   try {
//     const createdRecipe = await Recipe.create(req.body);
//     res.status(200).json(createdRecipe); // .json() will send proper headers in response so client knows it's json coming back
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.get("/recipes", async (req, res) => {
//   try {
//     const allRecipes = await Recipe.find({});
//     res.status(200).json(allRecipes);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.delete("/recipes/:id", async (req, res) => {
//   try {
//     const removedRecipe = await Recipe.findByIdAndRemove(req.params.id);
//     res.status(200).json(removedRecipe);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.get("/recipes/:id", async (req, res) => {
//   try {
//     const foundRecipe = await Recipe.findById(req.params.id);
//     res.status(200).json({ foundRecipe });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.put("/:id", async (req, res) => {
//   try {
//     const updatedRecipe = await Author.findByIdAndUpdate(
//       req.params.id,
//       req.body
//     );
//     res.status(200).json(updatedRecipe);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.get("/recipes/:id", (req, res) => {
//   const id = req.params.id;
//   //   const name = req.params.name;
//   console.log(req.params);
//   if (id) {
//     const recipe = Recipe.find((el) => el.id === id);
//     res.status(200).json({ message: recipe });
//   }
// });

// app.post("/recipes/", (req, res) => {
//   const recipeObj = req.body;
//   dummy_recipes.push(recipeObj);
//   res.json({ message: recipeObj });
// });

// app.put("/recipes/:id", (req, res) => {
//   const recipeId = req.params.id;
//   console.log(recipeId);

//   const recipeIndex = dummy_recipes.findIndex((el) => el.id === recipeId);
//   console.log(recipeIndex);
//   dummy_recipes[recipeIndex] = req.body;
//   res.json({ message: dummy_recipes });
// });

// app.delete("/recipes/:index", (req, res) => {
//   const deletedRecipe = dummy_recipes.splice(req.params.index, 1);
//   res.status(200).json({ message: deletedRecipe });
// });
