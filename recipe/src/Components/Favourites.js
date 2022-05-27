import { Link } from "react-router-dom";
import Recipe from "./Recipe";

function Favourites(props) {
  // console.log(props.handlefavourites);
  // console.log(props);

  return (
    <>
      {props.favourites.map((el, index) => {
        return (
          <Recipe
            id={el._id}
            imageURL={el.imageURL}
            title={el.title}
            index={index}
            handleRemoveFavourites={props.handleRemoveFavourites}
            key={index}
          />
        );
      })}
    </>
  );
}

export default Favourites;
