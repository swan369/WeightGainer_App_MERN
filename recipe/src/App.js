import "./App.css";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
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
import Success from "./Components/Success";
import Account from "./Components/Account";
import UserUpdate from "./Components/UserUpdate";
import UserDetail from "./Components/UserDetail";

const axios = require("axios");

// const NotFound = () => {
//   const redirect = () => {
//     navigate("/");
//   };

//   const navigate = useNavigate();
//   return (
//     <>
//       <h1>path not found</h1>
//       <button onClick={redirect}>Press to go home</button>
//     </>
//   );
// };

function App() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [loggedUser, setLoggedUser] = useState(false);

  const navigate = useNavigate();

  const loginUser = (found) => {
    setLoggedUser(found);
  };

  const toUpdateUsers = (updatedUser) => {
    console.log(updatedUser);
    const newUsers = [...users];
    const updatedUsers = newUsers.filter(
      (user) => user._id !== updatedUser._id
    );
    setUsers([...updatedUsers, updatedUser]);
  };

  const handleLogOut = () => {
    console.log("handleLogOut");
    const newUsers = [...users];
    const found = newUsers.find((user) => user.isLogin === true);
    found["isLogin"] = false;
    setLoggedUser(found);
    const filtered = users.filter((user) => user._id !== found._id);
    setUsers([...filtered, found]);
  };

  const recipeDelete = (deletedRecipe) => {
    const copyRecipes = [...recipes];
    const copyRandomRecipes = [...randomRecipes];
    const copySearchedData = [...searchedData];

    setRecipes(
      copyRecipes.filter((recipe) => recipe._id !== deletedRecipe._id)
    );
    setRandomRecipes(
      copyRandomRecipes.filter((recipe) => recipe._id !== deletedRecipe._id)
    );

    setSearchedData(
      copySearchedData.filter((recipe) => recipe._id !== deletedRecipe._id)
    );
    console.log("recipeDelete");
    navigate("/");
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    console.log(updatedRecipe);

    const copyRecipes = [...recipes];
    const copyRandomRecipes = [...randomRecipes];
    const copySearchedData = [...searchedData];

    setRecipes(
      copyRecipes.map((recipe, index) => {
        console.log("inside line 47");
        console.log(recipe._id, updatedRecipe._id);

        if (recipe._id === updatedRecipe._id) {
          return updatedRecipe;
        }
        return recipe;
      })
    );

    setRandomRecipes(
      copyRandomRecipes.map((recipe) => {
        if (recipe._id === updatedRecipe._id) {
          return updatedRecipe;
        } else {
          return recipe;
        }
      })
    );

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

  const handleSearch = (event, searchRef, checked) => {
    event.preventDefault();
    let search = searchRef.current.value.toLowerCase();
    console.log(search);

    if (checked.category)
      setSearchedData(
        recipes.filter((el) => el.category.toLowerCase() === search)
      );

    if (checked.title) {
      setSearchedData(
        recipes.filter((el) => el.title.toLowerCase().includes(search))
      );
    }

    if (checked.id) {
      setSearchedData(recipes.filter((el) => el._id.toLowerCase() === search));
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
      while (randomRecipes.length < 3) {
        // random number is 0,1,2 only i.e. 3 rendered
        let randomIndex = random(recipes.length);
        const found = recipes[randomIndex];
        const result = randomRecipes.every((el) => el?._id !== found?._id);
        if (result) {
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

  const getAllUsers = () => {
    setStatus("pending");
    axios
      .get("http://localhost:3003/users")
      .then(function (response) {
        // const users = response.data;
        setStatus("complete");
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setStatus("error");
      });
  };

  useEffect(() => {
    getAllRecipes();
    getAllUsers();
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

        {/* <li>
          <Link to="/users/register">Register</Link>
        </li> */}
        <li>
          <Link to="/recipes/create">CreateRecipe</Link>
        </li>
        <li>
          <Link to="/users/account">Account Management</Link>
        </li>
        <li>
          <Link to="/users/login">Login</Link>
        </li>
        <li onClick={handleLogOut}>
          <Link to="/">Logout</Link>
        </li>
      </ul>

      <Routes>
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/success" element={<Success />} />
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
          element={
            <RecipeDetail
              recipes={recipes}
              recipeDelete={recipeDelete}
              loggedUser={loggedUser}
            />
          }
        />
        <Route
          path="/recipes"
          element={
            <Recipes
              recipes={recipes}
              searchedData={searchedData}
              handleAddFavourites={handleAddFavourites}
              handleSearch={handleSearch}
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
          element={
            <CreateRecipe
              handleAddRecipe={handleAddRecipe}
              loggedUser={loggedUser}
            />
          }
        />
        <Route
          path="/users/login"
          element={<Login users={users} loginUser={loginUser} />}
        />

        <Route
          path="users/account"
          element={<Account loggedUser={loggedUser} />}
        >
          <Route
            path="/users/account/:id"
            element={
              <UserDetail
                loggedUser={loggedUser}
                toUpdateUsers={toUpdateUsers}
              />
            }
          />
          <Route
            path="/users/account/create"
            element={<CreateUser handleAddUser={handleAddUser} />}
          />
        </Route>

        <Route
          path="/recipes/:id/update"
          element={
            <RecipeUpdate
              handleUpdateRecipe={handleUpdateRecipe}
              loggedUser={loggedUser}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

// "proxy": "http://localhost:3003",
