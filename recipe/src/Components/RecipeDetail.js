import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetail.css";
import axios from "axios";

function RecipeDetail(props) {
  // console.log(props);
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/recipes/${id}/update`);
    console.log("handleEdit Works");
  };

  const handleServerDelete = () => {
    console.log("handleServerDelete");
    // console.log(id);
    axios
      .delete(`/recipes/${id}`)
      .then((response) => {
        const deletedData = response.data;
        console.log(deletedData);
        props.recipeDelete(deletedData);
      })

      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  const recipe = props.recipes.find((el) => el._id === id);

  const recipeIngredients = recipe.ingredients;
  const ingredients = recipeIngredients.split(".");
  const newIngredients = [...ingredients];
  newIngredients.pop();

  const ingredientsNice = newIngredients.map((el, index) => {
    return (
      <li className="list" key={index}>
        {index + 1}. {el}{" "}
      </li>
    );
  });

  const recipeSteps = recipe.steps.split(".");
  const newSteps = [...recipeSteps];
  newSteps.pop();
  const steps = newSteps.map((el, index) => {
    return (
      <li className="list" key={index}>
        {index + 1}. {el}
      </li>
    );
  });

  return (
    <>
      <div className="detailContainer">
        <div className="buttonContainer">
          <button onClick={handleEdit}>Edit me</button>
          <button className="button-handleDelete" onClick={handleServerDelete}>
            Delete me
          </button>
        </div>
        <img className="picture" src={recipe.imageURL} />

        <h1>{recipe.name}</h1>
        <h2>Ingredients</h2>

        <ul className="listContainer">{ingredientsNice}</ul>
        <h2>Steps</h2>
        <ul className="stepsContainer">{steps}</ul>
      </div>
    </>
  );
}

export default RecipeDetail;
