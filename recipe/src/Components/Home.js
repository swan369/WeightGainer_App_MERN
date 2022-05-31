import Recipe from "./Recipe";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
        <Swiper
          rewind={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {props.randomRecipes?.map((item, index) => {
            return (
              <SwiperSlide>
                <Recipe
                  id={item?._id}
                  {...item}
                  key={index}
                  index={index}
                  // handleAddFavourites={props.handleAddFavourites}
                  handleRemoveRecipes={props.handleRemoveRecipes}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Home;
