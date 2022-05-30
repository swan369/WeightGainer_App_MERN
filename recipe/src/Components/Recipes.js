import { useRef, useState } from "react";
import Recipe from "./Recipe";
import SearchRadio from "./SearchRadio";
import "./Recipes.css";

function Recipes(props) {
  const [isSearched, setIsSearched] = useState(false);
  const [checked, setChecked] = useState({
    title: false,
    category: true,
    id: false,
  });

  const checkUpdateRadio = (checkedObj) => {
    setChecked(checkedObj);
  };

  const renderIfValue = (data) => {
    if (data.length > 0 && isSearched) {
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
    }
    if (data.length === 0 && isSearched) {
      return <h3>Invalid Search or No Data Available</h3>;
    }
  };

  const searchRef = useRef();
  return (
    <>
      <div>
        <form className="example">
          <input
            ref={searchRef}
            className="inputSearch"
            type="text"
            placeholder="Search by title, id, or category"
            name="search"
          />
          <button
            onClick={(event) => {
              setIsSearched(true);
              props.handleSearch(event, searchRef, checked);
            }}
            type="submit"
            className="buttonSearch"
          >
            Press
          </button>
        </form>
        <div className="searchContainer">
          {renderIfValue(props.searchedData)}
        </div>
        <SearchRadio checked={checked} checkUpdate={checkUpdateRadio} />
      </div>
    </>
  );
}

export default Recipes;
