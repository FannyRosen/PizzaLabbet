import { useEffect, useState } from "react";
import { IReadOrder } from "../models/IReadOrder";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";
import { motion } from "framer-motion";
import { Box, Button, Typography } from "@mui/material";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Cart = () => {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    clearCart,
    cartItems,
    restaurantId,
  } = useShoppingCart();

  const [isLoading, setIsLoading] = useState(false);
  const [madeOrder, setMadeOrder] = useState<IReadOrder>();
  const [orderId, setOrderId] = useState(0);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  function placeOrder() {
    const newArray = cartItems.map((item) => {
      const newObject = {
        id: item.id,
        quantity: item.quantity,
      };
      return newObject;
    });

    const data = {
      cart: newArray,
      restaurantId: parseInt(restaurantId),
    };

    axios
      .post(
        "https://us-central1-pizza-app-4f927.cloudfunctions.net/pizzaApp-app/orders",
        data
      )
      .then((response) => {
        setOrderId(response.data.orderId);
      });
  }

  useEffect(() => {
    function getReadOrder() {
      setIsLoading(true);
      axios
        .get<IReadOrder>(
          "https://us-central1-pizza-app-4f927.cloudfunctions.net/pizzaApp-app/orders/" +
            orderId
        )
        .then((response) => {
          setMadeOrder(response.data);
          setIsLoading(false);
        });
      clearCart();
    }

    if (orderId) {
      getReadOrder();
    }
  }, [orderId, clearCart]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header id={0} />{" "}
          {orderId ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                rowGap: 4,
                marginTop: 20,
              }}
              component={motion.div}
              initial={{ y: -300 }}
              animate={{ y: -25 }}
            >
              <Typography variant="h1">Thank you for your order!</Typography>
              <Typography variant="body1">
                Order id: {madeOrder?.orderId}
              </Typography>
              <Typography variant="body1">
                Total price: {madeOrder?.totalPrice}
              </Typography>
              <Typography variant="body1">
                Ordered at: {madeOrder?.orderedAt}
              </Typography>
              <Typography variant="body1">
                Estimated delivery: {madeOrder?.estimatedDelivery}
              </Typography>
              <Typography variant="body1">
                Status: "{madeOrder?.status}"
              </Typography>
            </Box>
          ) : (
            <>
              {itemsPrice === 0 ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      rowGap: 5,
                    }}
                    component={motion.div}
                    initial={{ y: -300 }}
                    animate={{ y: 100 }}
                  >
                    <Typography>Your cart is empty</Typography>
                    <Button
                      onClick={goBack}
                      sx={{
                        display: "flex",
                      }}
                    >
                      <ArrowBackIcon
                        sx={{ marginRight: 1 }}
                        color="secondary"
                      ></ArrowBackIcon>
                      <Typography variant="body1">
                        Go back to previous page...
                      </Typography>
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      rowGap: 5,
                    }}
                    component={motion.div}
                    initial={{ y: -300 }}
                    animate={{ y: 100 }}
                  >
                    <Typography variant="h1">Your order</Typography>
                    {cartItems.map((cartitem) => {
                      console.log("TEST", cartitem.id);

                      return (
                        <>
                          <Box
                            sx={{ display: "flex", alignItems: "center" }}
                            key={`${cartitem.id}hej`}
                          >
                            <Typography variant="body1">
                              {" "}
                              {cartitem.name}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Button
                                data-testid="decrease"
                                sx={{ color: "white" }}
                                onClick={() => {
                                  decreaseCartQuantity(cartitem.id);
                                }}
                              >
                                {" "}
                                -{" "}
                              </Button>

                              <Typography variant="body1" data-testid="qty">
                                {cartitem.quantity}
                              </Typography>

                              <Button
                                data-testid="increase"
                                sx={{
                                  color: "white",
                                }}
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
                              </Button>
                            </Box>
                            <Typography variant="body1">
                              Price: {cartitem.price} :-
                            </Typography>
                          </Box>{" "}
                        </>
                      );
                    })}
                    <Box color="white">Totalt: {itemsPrice} :-</Box>
                    <Button
                      data-testid="place-order"
                      variant="contained"
                      component={motion.button}
                      whileTap={{ scale: 1.3, originX: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => {
                        placeOrder();
                      }}
                    >
                      Place order
                    </Button>
                    <Typography>or</Typography>
                    <Button
                      onClick={goBack}
                      sx={{
                        display: "flex",
                      }}
                    >
                      <ArrowBackIcon
                        sx={{ marginRight: 1 }}
                        color="secondary"
                      ></ArrowBackIcon>
                      <Typography>Go back to previous page...</Typography>
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
