import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMenu } from "../models/IMenu";
import { IRestaurant } from "../models/IRestaurant";
import { LoadingSpinner } from "./LoadingSpinner";
import { motion } from "framer-motion";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { Box, Typography } from "@mui/material";
import { Header } from "./Header";
import { log } from "console";

export interface IParams {
  id: string;
}

type StoreItemProps = {
  id: number;
};

export const Restaurant = () => {
  const { increaseCartQuantity, handleRestaurantId } = useShoppingCart();

  const [isLoading, setIsLoading] = useState(false);

  const [restaurant, setRestaurant] = useState<IRestaurant>({
    id: 0,
    name: "",
    address1: "",
    address2: "",
    latitude: 0,
    longitude: 0,
    distance: 0,
  });

  const [menuItems, setMenuItems] = useState<IMenu[]>([]);

  const params = useParams<Partial<IParams>>();

  useEffect(() => {
    function getRestaurantData() {
      setIsLoading(true);
      axios
        .get<IRestaurant>(
          "https://us-central1-pizza-app-4f927.cloudfunctions.net/pizzaApp-app/restaurants/" +
            params.id
        )
        .then((response) => {
          console.log("res", response);

          setRestaurant(response.data);
          handleRestaurantId(params.id ?? "");
          setIsLoading(false);
        });
    }

    getRestaurantData();
  }, [params.id]);

  useEffect(() => {
    axios
      .get<IMenu[]>(
        "https://us-central1-pizza-app-4f927.cloudfunctions.net/pizzaApp-app/restaurants/" +
          params.id +
          "/menu"
      )

      .then((response) => {
        setMenuItems(response.data);
      });
  }, [params.id]);

  return (
    <>
      <Header id={0} />
      <Box>
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Box
              sx={{
                overlay: "scroll",
              }}
              component={motion.div}
              initial={{ y: -300 }}
              animate={{ y: -45 }}
            >
              {" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 6,
                  marginBottom: 5,
                }}
                key={restaurant.id}
              >
                <Typography variant="h1">{restaurant.name}</Typography>
                <Typography variant="body1">{restaurant.address1}</Typography>
                <Typography variant="body1">{restaurant.address2}</Typography>
              </Box>
              {menuItems.map((menu) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      rowGap: 1,
                      marginBottom: 4,
                    }}
                    key={menu.id}
                  >
                    {" "}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: 170,
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Typography variant="h2">{menu.name}</Typography>
                      <motion.button
                        id="add-btn"
                        whileTap={{ scale: 1.3, originX: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() =>
                          increaseCartQuantity(menu.id, menu.name, menu.price)
                        }
                      >
                        {" "}
                        +{" "}
                      </motion.button>
                    </Box>
                    {menu.topping ? (
                      <Typography
                        variant="body1"
                        sx={{ marginLeft: 5, marginRight: 5 }}
                      >
                        Toppings: {menu.topping?.join(", ")}
                      </Typography>
                    ) : null}
                    <Typography variant="body1">{menu.price} :-</Typography>
                  </Box>
                );
              })}
            </Box>
          )}
        </>
      </Box>
    </>
  );
};
