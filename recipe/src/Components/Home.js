import Recipe from "./Recipe";
import "./Home.css";
// import { useEffect, useState } from "react";

const Home = (props) => {
  if (props.randomRecipes === 0) {
    return (
      <>
        <div className="cardNoRecipes">
          <h3>No Recipes Found in Database</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        {props.randomRecipes?.map((item, index) => {
          return (
            <Recipe
              id={item?._id}
              {...item}
              key={index}
              index={index}
              handleAddFavourites={props.handleAddFavourites}
              handleRemoveRecipes={props.handleRemoveRecipes}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
