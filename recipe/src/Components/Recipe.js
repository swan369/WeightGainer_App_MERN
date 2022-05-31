import "./Recipe.css";
import { Link } from "react-router-dom";

function Recipe(props) {
  // console.log(props);

  // const favourites = props.handleRemoveFavourites;
  // const recipes = props.handleRemoveRecipes;
  // const searched = props.handleRemoveSearched;

  // const handleRemoveChoice = () => {
  //   if (favourites) {
  //     return () => {
  //       props.handleRemoveFavourites(props.id);
  //     };
  //   }

  //   if (recipes) {
  //     return () => {
  //       props.handleRemoveRecipes(props.id);
  //     };
  //   }
  //   if (searched) {
  //     return () => {
  //       props.handleRemoveSearched(props.id);
  //     };
  //   }
  // };

  return (
    <>
      {/* <div className="card">
        <Link to={`/recipes/${props.id}`}>
          <img className="images" src={props.imageURL} alt="foodPicture" />
        </Link>
        <div>
          <h5>{props.title}</h5>
        </div>
        <span onClick={handleRemoveChoice()} style={{ cursor: "pointer" }}>
          remove
        </span>{" "}
        |{" "}
        <span
          className="add2Favourites"
          onClick={() => {
            props.handleAddFavourites(props.id);
          }}
        >
          add2Favourites
        </span>
      </div> */}

      <div className="card">
        <Link to={`/recipes/${props.id}`}>
          <img className="images" src={props.imageURL} alt="foodPicture" />
        </Link>
        {/* <span>{props.title}</span> | {"  "}
        <span onClick={handleRemoveChoice()} style={{ cursor: "pointer" }}>
          remove | {"  "}
        </span>{" "}
        <span onClick={handleRemoveChoice()} style={{ cursor: "pointer" }}>
          detail
        </span> */}
        {/* <span
          className="add2Favourites"
          onClick={() => {
            props.handleAddFavourites(props.id);
          }}
        >
          add2Favourites
        </span> */}
      </div>
    </>
  );
}

export default Recipe;
