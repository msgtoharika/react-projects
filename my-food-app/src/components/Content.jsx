import React, { useState, useEffect } from "react";
import RestaurantContainer from "./RestaurantContainer";
import Search from "./Search";
import Filter from "./Filter";
import ShimmerCard from "./ShimmerCard";
import useCheckOnlineStatus from "../hooks/useCheckOnlineStatus";

const Content = () => {
  const url =
    "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5/?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING";

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestauants, setFilteredRestaurants] = useState([]);
  
  const onlineStatus = useCheckOnlineStatus();

  useEffect(() => {
    fetchRestaurantData(url);
  }, []);

  if(onlineStatus === false){
    return <h1> You are offline. Please try again.........</h1>
  }

  const fetchRestaurantData = async (url) => {
    const resp = await fetch(url);
    const respJSON = await resp.json();
    console.log(respJSON.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setRestaurants(
      respJSON.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestaurants(
      respJSON.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  if (restaurants.length === 0) {
    return <ShimmerCard />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <Filter restaurants={restaurants} setRestaurants={setRestaurants} />
        <Search
          restaurants={restaurants}
          setFilteredRestaurants={setFilteredRestaurants}
        />
      </div>
      <RestaurantContainer resData={filteredRestauants} />
    </div>
  );
};

export default Content;
