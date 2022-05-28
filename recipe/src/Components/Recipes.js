import { useRef } from "react";
import Recipe from "./Recipe";
import "./Recipes.css";

function Recipes(props) {
  // useEffect(() => {
  //   props.handleSearchCategory(searchRef);
  // }, [props.recipes]);

  const renderIfValue = (data) => {
    if (data.length > 0) {
      return data.map((el, index) => (
        <Recipe
          id={el?._id}
          {...el}
          index={index}
          key={index}
          handleAddFavourites={props.handleAddFavourites}
          handleRemoveSearched={props.handleRemoveSearched}
        />
      ));
    } else {
      return <h3>Invalid Search or No Data Available</h3>;
    }
  };

  const searchRef = useRef();
  return (
    <>
      <form className="example">
        <input
          ref={searchRef}
          className="inputSearch"
          type="text"
          placeholder="Search by category..."
          name="search"
        />
        <button
          onClick={(event) => props.handleSearchCategory(event, searchRef)}
          type="submit"
          className="buttonSearch"
        >
          Press
        </button>
      </form>
      <div className="searchContainer">{renderIfValue(props.searchedData)}</div>
    </>
  );
}

export default Recipes;
