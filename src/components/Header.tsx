import { Box, Button, Link, Typography } from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link as RouterLink } from "react-router-dom";
import { useShoppingCart } from "../contexts/ShoppingCartContext";

type StoreItemProps = {
  id: number;
};

export const Header = ({ id }: StoreItemProps) => {
  const { cartQuantity } = useShoppingCart();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        margin: 1,
        position: "sticky",
      }}
    >
      <Link underline="none" component={RouterLink} to={"/"}>
        <LocalPizzaIcon
          sx={{
            width: 40,
            height: 60,
            color: "white",
            padding: 1,
            paddingTop: 2,
          }}
        ></LocalPizzaIcon>
      </Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          borderBottom: 0.5,
          borderColor: "white",
          width: "90%",
          color: "white",
          padding: 1,
        }}
      >
        <Link
          data-testid="home-link"
          underline="none"
          component={RouterLink}
          to={"/"}
        >
          <Typography>Pizzalabbet</Typography>
        </Link>

        <Box sx={{ padding: 0.5 }}>
          <Link component={RouterLink} to={"/cart"}>
            <Box
              component={motion.div}
              whileTap={{ scale: 1.3, originX: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="button-wrapper"
            >
              <Button
                className="cart-button"
                variant="contained"
                component={motion.button}
              >
                <>
                  {" "}
                  <FontAwesomeIcon
                    id="cart-icon"
                    className="icon"
                    icon={faCartShopping}
                  />
                  <Typography data-testid="cart-items" variant="body1">
                    ({cartQuantity})
                  </Typography>
                </>
              </Button>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
