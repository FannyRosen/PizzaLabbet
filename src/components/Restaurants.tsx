import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
import { IRestaurant } from "./models/IRestaurant";
//import video from "../assets/video3.mp4";
import { motion } from "framer-motion";

export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function getData() {
    setIsLoading(true);
    axios
      .get<IRestaurant[]>(
        "https://private-anon-cf730f788f-pizzaapp.apiary-mock.com/restaurants/"
      )
      .then((response) => {
        navigator.geolocation.getCurrentPosition(
          (currentLocation: GeolocationPosition) => {
            let restaurantsWithDistances: IRestaurant[] = response.data.map(
              (restaurant) => {
                return {
                  ...restaurant,
                  distance: Math.sqrt(
                    Math.pow(
                      currentLocation.coords.longitude - restaurant.longitude,
                      2
                    ) +
                      Math.pow(
                        currentLocation.coords.latitude - restaurant.latitude,
                        2
                      )
                  ),
                };
              }
            );

            restaurantsWithDistances.sort(function (a, b) {
              return a.distance - b.distance;
            });

            setRestaurants(restaurantsWithDistances);
            console.log(restaurantsWithDistances);
            setIsLoading(false);
          }
        );
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="video-container">
        <div className="overlay"></div>
        {/*  <video src={video} autoPlay loop muted></video> */}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <motion.div
              initial={{ y: -300 }}
              animate={{ y: -25 }}
              className="restaurant-container"
            >
              <motion.h1>Welcome to my Pizza App</motion.h1>
              <p>Please choose a restaurant</p>
              {restaurants.map((restaurant) => {
                return (
                  <div key={restaurant.id}>
                    <Link to={"/restaurant/" + restaurant.id}>
                      <motion.button
                        whileTap={{ scale: 1.3, originX: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {restaurant.name}
                      </motion.button>
                    </Link>
                  </div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};
