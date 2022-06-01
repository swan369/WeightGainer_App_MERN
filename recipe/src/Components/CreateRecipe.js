import "./CreateRecipe.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateRecipe = (props) => {
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const postItem = {
      category: event.target.category.value,
      title: event.target.title.value,
      imageURL: event.target.imageURL.value,
      ingredients: event.target.ingredients.value,
      steps: event.target.steps.value,
      creator: event.target.creator.value,
    };

    // fetch("http://localhost:3003/recipes", {
    //   method: "POST",
    //   body: JSON.stringify(postItem),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((resJson) => {
    //     console.log(resJson);
    //     props.handleAddRecipe(resJson);
    //   })
    //   .catch((error) => console.error({ Error: error }));

    // you need the http://localhost:3003
    axios
      .post("http://localhost:3003/recipes", postItem)
      .then(function (response) {
        const createdRecipe = response.data;
        props.handleAddRecipe(createdRecipe);
        navigate("/success");
      })
      .catch(function (error) {
        const errorMessage = error.response.data.error;
        console.log(errorMessage);
        setError({
          isError: true,
          message: errorMessage,
        });
      });
  };
  const handleRedirect = function () {
    navigate("/recipes/create");
    setError({});
    console.log("handleRedirect");
  };
  if (error.isError === true) {
    return (
      <>
        <div className="divCreateRecipe">
          <h3>Error: please see below for details</h3>

          {error.message}
          <button className="buttonRecipe" onClick={handleRedirect}>
            Return to Recipe Creation
          </button>
        </div>
      </>
    );
  }

  const handleToLogin = () => {
    navigate("/users/login");
  };

  if (!props.loggedUser.isLogin) {
    return (
      <div>
        <h3>You need to login</h3>
        <button onClick={handleToLogin}>ok</button>
      </div>
    );
  }

  return (
    <>
      <h1>Create Your Recipe</h1>
      <form className="inputCreator" onSubmit={handleSubmit}>
        <div className="divForm">
          {/* <label className="labelRecipeName" htmlFor="recipeName"></label> */}
          <input
            className="inputField"
            type="text"
            id="category"
            name="category"
            placeholder="accepted categories are seafood, beef, pork and chicken..."
          />
        </div>
        <div className="divForm">
          {/* <label className="labelRecipeName" htmlFor="recipeName"></label> */}
          <input
            className="inputField"
            type="text"
            id="recipeName"
            name="title"
            placeholder="recipe name..."
          />
        </div>

        <div className="divForm">
          {/* <label className="labelRecipeName" htmlFor="recipeName"></label> */}
          <input
            className="inputField"
            type="text"
            id="imageURL"
            name="imageURL"
            placeholder="image URL..."
          />
        </div>

        <div className="divForm">
          {/* <label htmlFor="ingredients">Ingredients: </label> */}
          <textarea
            rows="10"
            cols="100"
            className="textArea "
            type="text"
            id="ingredients"
            name="ingredients"
            placeholder="ingredients..."
          />
        </div>
        <div className="divForm">
          {/* <label htmlFor="steps">Steps: </label> */}
          <textarea
            rows="10"
            cols="70"
            className="textArea "
            type="text"
            id="steps"
            name="steps"
            placeholder="steps..."
          />
        </div>

        <div className="divForm">
          {/* <label htmlFor="creator">Creator: </label> */}
          <input
            className="inputField"
            type="text"
            id="creator"
            name="creator"
            placeholder="creator..."
          />

          <input className="buttonSubmit" type="submit" value="Submission" />
        </div>
        <div className="divForm">
          <input
            className="reset"
            type="reset"
            value="***Danger*** Clears all what you write in form"
          />
        </div>
      </form>
    </>
  );
};

export default CreateRecipe;
