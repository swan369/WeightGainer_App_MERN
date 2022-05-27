import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Components/Home";
import RecipeDetail from "./Components/RecipeDetail";
import Recipes from "./Components/Recipes";
import Favourites from "./Components/Favourites";

import Login from "./Components/Login";
import CreateRecipe from "./Components/CreateRecipe";
import About from "./Components/About";
import CreateUser from "./Components/CreateUser";
import RecipeUpdate from "./Components/RecipeUpdate";
const axios = require("axios");

const NotFound = () => {
  const redirect = () => {
    navigate("/");
  };

  const navigate = useNavigate();
  return (
    <>
      <h1>path not found</h1>
      <button onClick={redirect}>Press to go home</button>
    </>
  );
};

function App() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const handleUpdateRecipe = (updatedRecipe) => {
    console.log(updatedRecipe);
    // const recipeIndex = recipes.findIndex((el) => el._id === id);
    const copyRecipes = [...recipes];
    const copyRandomRecipes = [...randomRecipes];
    const copySearchedData = [...searchedData];

    setRecipes(
      copyRecipes.map((recipe, index) => {
        console.log("inside line 47");
        console.log(recipe._id, updatedRecipe._id);

        if (recipe._id === updatedRecipe._id) {
          console.log("inside line 49");
          return updatedRecipe;
        }
        return recipe;
      })
    );

    console.log(recipes);

    setRandomRecipes(
      copyRandomRecipes.map((recipe) => {
        if (recipe._id === updatedRecipe._id) {
          return updatedRecipe;
        } else {
          return recipe;
        }
      })
    );
    console.log(randomRecipes);

    setSearchedData(
      copySearchedData.map((recipe) => {
        if (recipe._id === updatedRecipe._id) {
          return updatedRecipe;
        } else {
          return recipe;
        }
      })
    );
    console.log(searchedData);

    // setSearchedData(recipes);

    console.log("handleUpdateRecipe");
  };

  const handleAddUser = (newUser) => {
    console.log("handleCreateUser");
    setUsers([...users, newUser]);
  };

  const handleSearchCategory = (event, searchRef) => {
    event.preventDefault();
    let search = searchRef.current.value;
    console.log(search);
    const searchedData = recipes.map((el) => {
      // console.log(el.category);
      if (el.category === search) {
        return el;
      }
    });

    // render if value, else don't render
    if (!searchedData.every((el) => el === undefined)) {
      setSearchedData(searchedData);
    } else {
      setSearchedData([]);
    }
    // clear input render after submission
    searchRef.current.value = "";
  };

  const getRandomRecipes = (recipes) => {
    const random = (num) => {
      const randomNum = Math.floor(Math.random() * num);
      return randomNum;
    };

    let randomRecipes = [];
    if (recipes.length > 0) {
      while (randomRecipes?.length < 3) {
        let randomIndex = random(4);
        const found = recipes[randomIndex];
        const result = randomRecipes.find((el) => el?._id === found?._id);
        if (result === undefined) {
          randomRecipes.push(found);
        }
      }

      return randomRecipes;
    }
  };

  const handleRemoveRecipes = (id) => {
    const filteredRecipes = randomRecipes.filter((el) => el._id !== id);
    setRandomRecipes(filteredRecipes);
  };

  const handleAddFavourites = (id) => {
    const favourite = recipes.find((el) => el._id === id);
    const found = favourites.find((el) => el._id === id);
    if (!found) {
      setFavourites([...favourites, favourite]);
    }
  };

  const handleRemoveFavourites = (id) => {
    const filteredFavourites = favourites.filter((el) => el._id !== id);
    setFavourites(filteredFavourites);
  };

  const handleRemoveSearched = (id) => {
    const filteredSearched = searchedData.filter((el) => el._id !== id);
    setSearchedData(filteredSearched);
  };

  const handleAddRecipe = (recipe) => {
    console.log("handleAddRecipe works");
    setRecipes([...recipes, recipe]);
  };

  const getAllRecipes = function () {
    setStatus("pending");
    axios
      .get("http://localhost:3003/recipes")
      .then((response) => {
        setStatus("complete");
        // console.log(response);
        setRecipes(response.data);
      })
      .catch((error) => {
        setStatus("error");
        console.log(error);
      });
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  useEffect(() => {
    const homeRecipes = getRandomRecipes(recipes);
    setRandomRecipes(homeRecipes);
  }, [recipes]);

  if (status === "error") {
    return <h1>Error</h1>;
  }
  if (status === "pending") {
    return <h1>Loading</h1>;
  }

  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/recipes">Search</Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
        <li>
          <Link to="/users/login">Login</Link>
        </li>
        <li>
          <Link to="/users/register">Register</Link>
        </li>
        <li>
          <Link to="/recipes/create">CreateRecipe</Link>
        </li>
        <li>
          <Link to="/users/create">CreateUsers</Link>
        </li>
      </ul>

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/"
          element={
            <Home
              // recipes={recipes}
              randomRecipes={randomRecipes}
              handleAddFavourites={handleAddFavourites}
              handleRemoveRecipes={handleRemoveRecipes}
            />
          }
        />
        <Route
          path="/recipes/:id"
          element={<RecipeDetail recipes={recipes} />}
        />
        <Route
          path="/recipes"
          element={
            <Recipes
              recipes={recipes}
              searchedData={searchedData}
              handleAddFavourites={handleAddFavourites}
              handleSearchCategory={handleSearchCategory}
              handleRemoveRecipes={handleRemoveRecipes}
              handleRemoveSearched={handleRemoveSearched}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favourites}
              handleRemoveFavourites={handleRemoveFavourites}
            />
          }
        />
        <Route
          path="/recipes/create"
          element={<CreateRecipe handleAddRecipe={handleAddRecipe} />}
        />
        <Route path="/users/login" element={<Login />} />
        <Route
          path="/users/create"
          element={<CreateUser handleAddUser={handleAddUser} />}
        />

        <Route
          path="/recipes/:id/update"
          element={<RecipeUpdate handleUpdateRecipe={handleUpdateRecipe} />}
        />
      </Routes>
    </div>
  );
}

export default App;
