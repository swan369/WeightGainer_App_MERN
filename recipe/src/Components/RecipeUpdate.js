import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";

export default function RecipeUpdate(props) {
  const id = useParams().id;
  console.log(id);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const putRecipe = {
      category: event.target.category.value,
      title: event.target.title.value,
      imageURL: event.target.imageURL.value,
      ingredients: event.target.ingredients.value,
      steps: event.target.steps.value,
      creator: event.target.creator.value,
    };
    //http://localhost:3000 was removed as proxy was setup in package.json
    // fetch(`/recipes/${id}/update`, {
    //   method: "PUT",
    //   body: JSON.stringify(putRecipe),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((resJson) => {
    //     console.log(resJson);
    //   })
    //   .then((error) => {
    //     console.log(error);
    //   });

    axios
      //http://localhost:3000 was removed as proxy was setup in package.json
      .put(`/recipes/${id}/update`, putRecipe)
      .then((response) => {
        console.log(response);
        const updatedRecipe = response.data;
        props.handleUpdateRecipe(updatedRecipe);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  return (
    <>
      <h2>Recipe Update</h2>
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
}
