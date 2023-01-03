import axios from "axios";
import React, { useEffect, useState, createContext } from "react";
import { Link, useParams } from "react-router-dom";
import { IMenu } from "./models/IMenu";
import { IRestaurant } from "./models/IRestaurant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { LoadingSpinner } from "./LoadingSpinner";
import { motion } from "framer-motion";
import { useShoppingCart } from "../contexts/ShoppingCartContext";

export interface IParams {
  id: string;
}

type StoreItemProps = {
  id: number;
};

export const Restaurant = ({ id }: StoreItemProps) => {
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart();
  const quantity = getItemQuantity(id);

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

  function getRestaurantData() {
    setIsLoading(true);
    axios
      .get<IRestaurant>(
        "https://private-anon-cf730f788f-pizzaapp.apiary-mock.com/restaurants/" +
          params.id
      )
      .then((response) => {
        setRestaurant(response.data);
        console.log(restaurant);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getRestaurantData();
  }, []);

  useEffect(() => {
    axios
      .get<IMenu[]>(
        "https://private-anon-ff907f368d-pizzaapp.apiary-mock.com/restaurants/" +
          params.id +
          "/menu?category=Pizza&orderBy=rank"
      )
      .then((response) => {
        setMenuItems(response.data);
      });
  }, []);

  return (
    <>
      <div className="cover">
        <Link to={"/cart"}>
          <motion.div
            whileTap={{ scale: 1.3, originX: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="button-wrapper"
          >
            <button className="cart-button">
              <>
                {" "}
                <FontAwesomeIcon className="icon" icon={faCartShopping} />
                <p>({quantity})</p>
              </>
            </button>
          </motion.div>
        </Link>
      </div>
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.div initial={{ y: -300 }} animate={{ y: -45 }}>
            {" "}
            <div className="address-container" key={restaurant.id}>
              <h1>{restaurant.name}</h1>
              <p>{restaurant.address1}</p>
              <p>{restaurant.address2}</p>
            </div>
            {menuItems.map((menu) => {
              return (
                <div className="menu-container" key={menu.id}>
                  {" "}
                  <div className="item-container">
                    <h2>{menu.name}</h2>
                    <motion.button
                      className="add-button"
                      whileTap={{ scale: 1.3, originX: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() =>
                        increaseCartQuantity(id, menu.name, menu.price)
                      }
                    >
                      {" "}
                      +{" "}
                    </motion.button>
                  </div>
                  {menu.topping ? (
                    <p>Toppings: {menu.topping?.join(", ")}</p>
                  ) : null}
                  <p>{menu.price} :-</p>
                </div>
              );
            })}
          </motion.div>
        )}
      </>
    </>
  );
};
