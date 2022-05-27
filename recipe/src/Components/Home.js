import Recipe from "./Recipe";
import "./Home.css";
// import { useEffect, useState } from "react";

const Home = (props) => {
  // console.log(props);
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
