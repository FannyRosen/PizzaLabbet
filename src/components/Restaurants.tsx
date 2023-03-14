import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
import { IRestaurant } from "../models/IRestaurant";
import video from "../assets/video3.mp4";
import { motion } from "framer-motion";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { CardMedia } from "@mui/material";

export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function getData() {
    setIsLoading(true);
    axios
      .get<IRestaurant[]>(
        "https://private-anon-f516a4c55f-pizzaapp.apiary-mock.com/restaurants/"
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
            setIsLoading(false);
          }
        );
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        top: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></Box>
      <CardMedia
        src={video}
        component="video"
        autoPlay
        loop
        muted
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100vh",
        }}
      ></CardMedia>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box
            sx={{
              position: "absolute",
              height: "100vh -250px",
              width: "100vw",
              top: 300,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              component={motion.div}
              initial={{ y: -300 }}
              animate={{ y: -25 }}
            >
              <Typography variant="h1" component={motion.h1}>
                Welcome to Pizzalabbet
              </Typography>
              <Typography variant="body1" marginTop={2}>
                Please choose a restaurant
              </Typography>
              <Grid
                container
                columns={{ xs: 4, sm: 8, md: 12 }}
                alignItems="center"
                style={{ width: "500px" }}
              >
                {restaurants.map((restaurant) => {
                  return (
                    <Grid
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      marginTop={5}
                      key={restaurant.id}
                    >
                      <Link
                        component={RouterLink}
                        underline="none"
                        to={"/restaurant/" + restaurant.id}
                      >
                        <Button
                          data-testid="btn"
                          variant="contained"
                          component={motion.button}
                          color="primary"
                          whileTap={{ scale: 1.3, originX: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {restaurant.name}
                        </Button>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
