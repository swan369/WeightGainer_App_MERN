import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RecipeDetail.css";
import axios from "axios";

function RecipeDetail(props) {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState({ warning: false, delete: false });
  const [status, setStatus] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const params = useParams();
  const id = params.id;

  const handleEdit = () => {
    if (props.loggedUser.isLogin === true) {
      navigate(`/recipes/${id}/update`);
    } else {
      setEditStatus("fail");
    }
    console.log("handleEdit Works");
  };

  const handleGoLog = () => {
    setEditStatus("");
    navigate("/users/login");
  };
  if (editStatus === "fail") {
    return (
      <>
        <div>
          <h3>You are not logged in !</h3>
          <button onClick={handleGoLog}>Go log in !</button>
        </div>
      </>
    );
  }

  const handleConfirmDelete = () => {
    console.log("handleConfirmDelete");
    const deleteObj = { delete: true };
    setPrompt({ ...prompt, ...deleteObj });
    console.log(prompt.delete);
  };

  const handleIsDelete = () => {
    if (props.loggedUser.isLogin === true) {
      setPrompt({ ...prompt, warning: true });
      setStatus("");
    } else {
      setStatus("fail");
    }
  };

  const handleGoBack = () => {
    setStatus("");
    navigate("/users/login");
  };
  if (status === "fail") {
    return (
      <>
        <div>
          <h3>You are not logged in</h3>
          <button onClick={handleGoBack}>Go log in</button>
        </div>
      </>
    );
  }

  const axiosDelete = () => {
    axios
      .delete(`/recipes/${id}`)
      .then((response) => {
        const deletedData = response.data;
        console.log(deletedData);
        props.recipeDelete(deletedData);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  if (prompt.delete === true) {
    axiosDelete();
    setPrompt({});
  }

  if (prompt.warning === true) {
    return (
      <>
        <div>
          <h3>Warning, do you wish to delete it permanently ?</h3>
          <button onClick={handleConfirmDelete}>delete</button>
        </div>
      </>
    );
  }

  const recipe = props.recipes.find((el) => el._id === id);

  const recipeIngredients = recipe.ingredients;
  const ingredients = recipeIngredients.split(".");
  const newIngredients = [...ingredients];
  newIngredients.pop();

  const ingredientsNice = newIngredients.map((el, index) => {
    return (
      <>
        <div className="divList">
          <li className="list" key={el._id}>
            {index + 1}. {el}{" "}
          </li>
        </div>
      </>
    );
  });

  const recipeSteps = recipe.steps.split(".");
  const newSteps = [...recipeSteps];
  newSteps.pop();
  const steps = newSteps.map((el, index) => {
    return (
      <div className="divList">
        <li className="list" key={el._id}>
          {index + 1}. {el}
        </li>
      </div>
    );
  });

  return (
    <>
      <div className="detailContainer">
        <div className="buttonContainer">
          <button onClick={handleEdit}>Edit me</button>
          <button className="button-handleDelete" onClick={handleIsDelete}>
            Delete me
          </button>
        </div>
        <img className="picture" src={recipe.imageURL} alt="food" />

        <h1>{recipe.name}</h1>
        <h2>Ingredients</h2>
        {ingredientsNice}
        <h2>Steps</h2>
        {steps}
      </div>
    </>
  );
}

export default RecipeDetail;
