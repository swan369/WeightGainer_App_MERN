import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./RecipeDetail.css";
import axios from "axios";

function RecipeDetail(props) {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState({ warning: false, delete: false });
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [editStatus, setEditStatus] = useState("");

  const params = useParams();
  const id = params.id;
  // console.log(id);
  const canDelete = prompt.delete === "confirm";

  useEffect(() => {
    if (canDelete) {
      setPrompt({ ...prompt, delete: "success" });
      axiosDelete();
    }
  }, [canDelete]);

  // ############ edit ################
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

  // ########## delete #############

  const handleConfirmDelete = () => {
    console.log("handleConfirmDelete");
    setPrompt({ ...prompt, ...{ delete: "confirm", warning: false } });
    setDeleteStatus(false);
  };

  const handleIsDelete = () => {
    if (props.loggedUser.isLogin === true) {
      setDeleteStatus(true);
      setPrompt({ ...prompt, warning: true });
      // setStatus("");
    } else {
      setDeleteStatus("fail");
    }
  };

  const handleGoBack = () => {
    setDeleteStatus("");
    navigate("/users/login");
  };

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

  if (prompt.delete === "success") {
    navigate("/success");
  }

  if (prompt.warning) {
    return (
      <>
        <div>
          <h3>Warning, do you wish to delete it permanently ?</h3>
          <button onClick={handleConfirmDelete}>delete</button>
        </div>
      </>
    );
  }
  // ##### login valdiation #####
  if (!props.loggedUser.isLogin && (deleteStatus || editStatus)) {
    return (
      <>
        <div>
          <h3>You are not logged in</h3>
          <button onClick={handleGoBack}>Go log in</button>
        </div>
      </>
    );
  }

  const List = (props) => {
    return (
      <li className="list">
        {props.index}. {props.el}
      </li>
    );
  };

  // ############ recipes output start #############
  const recipe = props.recipes.find((el) => el._id === id);

  const recipeIngredients = recipe.ingredients;
  const ingredients = recipeIngredients.split(".");
  const newIngredients = [...ingredients];
  newIngredients.pop();

  const ingredientsNice = newIngredients.map((el, index) => {
    return (
      <>
        <div className="divList">
          <List key={index} el={el} index={index + 1} />
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
        <List key={index} index={index + 1} el={el} />
      </div>
    );
  });
  // ###### recipes output end page #########

  return (
    <>
      <div className="detailContainer">
        <div className="buttonContainer">
          <button onClick={handleEdit}>Edit me</button>
          <button
            className="add2Favourites"
            onClick={() => {
              props.handleAddFavourites(id);
            }}
          >
            add2Favourites
          </button>
          <button className="button-handleDelete" onClick={handleIsDelete}>
            Delete me
          </button>
        </div>
        <img className="picture" src={recipe.imageURL} alt="food" />

        <h1>{recipe.title}</h1>
        <h2>Ingredients</h2>
        {ingredientsNice}
        <h2>Steps</h2>
        {steps}
      </div>
    </>
  );
}

export default RecipeDetail;
