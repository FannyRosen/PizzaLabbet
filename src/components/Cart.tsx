import { useContext, useEffect, useState } from "react";
import { ICartItem } from "./models/ICart";
import { IReadOrder } from "./models/IReadOrder";
import { IMenu } from "./models/IMenu";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";
import { motion } from "framer-motion";

import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "../contexts/ShoppingCartContext";

interface IOrderProps {
  cart: CartItem[];
  restaurantId: number;
  menu: IMenu[];
  totalPrice: number;
  id: number;
  name: string;
  price: number;
}

export const Cart = (props: IOrderProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
  } = useShoppingCart();

  const [isLoading, setIsLoading] = useState(false);
  const [madeOrder, setMadeOrder] = useState<IReadOrder>();
  const [orderId, setOrderId] = useState(0);

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  console.log(cartItems);

  function placeOrder() {
    axios
      .post(
        "https://private-anon-cf730f788f-pizzaapp.apiary-mock.com/orders/",
        props.cart
      )
      .then((response) => {
        setOrderId(response.data.orderId);
      });
  }

  useEffect(() => {
    if (orderId) {
      getReadOrder();
    }
  }, [orderId]);

  function getReadOrder() {
    setIsLoading(true);
    axios
      .get<IReadOrder>(
        "https://private-anon-c660ab3fa2-pizzaapp.apiary-mock.com/orders/" +
          orderId
      )
      .then((response) => {
        setMadeOrder(response.data);
        console.log("response.data: ", response.data);
        console.log(response.data.restuarantId);
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {" "}
          {orderId ? (
            <motion.div
              initial={{ y: -300 }}
              animate={{ y: -25 }}
              className="finalorder-container"
            >
              <h1 className="order-msg">Thank you for your order!</h1>
              <p>Order id: {madeOrder?.orderId}</p>
              <p>Total price: {madeOrder?.totalPrice}</p>
              <p>Ordered at: {madeOrder?.orderedAt}</p>
              <p>Estimated delivery: {madeOrder?.esitmatedDelivery}</p>
              <p>Status: "{madeOrder?.status}"</p>
            </motion.div>
          ) : (
            <>
              <motion.div initial={{ y: -300 }} animate={{ y: 100 }}>
                <h1>Your order</h1>
                {cartItems.map((cartitem) => {
                  return (
                    <>
                      <div
                        key={`${cartitem.id}hej`}
                        className="menuitem-wrapper"
                      >
                        <p className="p"> {cartitem.name}</p>
                        <div className="p-quantity">
                          <button
                            className="add-button"
                            onClick={() => decreaseCartQuantity(props.id)}
                          >
                            {" "}
                            -{" "}
                          </button>

                          <p className="quantity">{cartitem.quantity}</p>

                          <button
                            className="add-button"
                            onClick={() =>
                              increaseCartQuantity(
                                cartitem.id,
                                cartitem.name,
                                cartitem.price
                              )
                            }
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                        <p className="p">Price: {cartitem.price} :-</p>
                      </div>{" "}
                      <div className="price-wrapper">
                        Totalt: {itemsPrice} :-
                      </div>
                      <motion.button
                        whileTap={{ scale: 1.3, originX: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={placeOrder}
                      >
                        Place order
                      </motion.button>
                    </>
                  );
                })}
              </motion.div>
            </>
          )}
        </>
      )}
    </>
  );
};
