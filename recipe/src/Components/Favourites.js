import Recipe from "./Recipe";
import "./Favourites.css";

function Favourites(props) {
  // console.log(props.handlefavourites);
  // console.log(props);

  return (
    <>
      <div className="containerFavourites">
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
      </div>
    </>
  );
}

export default Favourites;
