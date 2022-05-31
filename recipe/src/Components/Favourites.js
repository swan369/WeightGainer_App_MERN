import Recipe from "./Recipe";
import "./Favourites.css";

function Favourites(props) {
  const isRemoveButton = (id) => {
    if (props.favourites.length > 0) {
      return (
        <button
          //callback needed else handleRemove will b called everytime it renders and the favourites will b removed.
          //also due to callback and being mapped with each Recipe, hence
          //each button will "store" a unique id in the handleRemoveFavourites(id) while waiting to be called by the callback function.
          onClick={() => {
            props.handleRemoveFavourites(id);
          }}
          className="removeMeBtn"
        >
          removeMeFromFavourites
        </button>
      );
    }
  };

  return (
    <>
      <div className="containerFavourites">
        {props.favourites.map((el, index) => {
          return (
            <>
              <div>
                {isRemoveButton(el._id)}
                <Recipe
                  id={el._id}
                  imageURL={el.imageURL}
                  title={el.title}
                  index={index}
                  handleRemoveFavourites={props.handleRemoveFavourites}
                  key={el._id}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Favourites;
