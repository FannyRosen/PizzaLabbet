import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { Link as RouterLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
        component={motion.div}
        initial={{ y: -300 }}
        animate={{ y: -25 }}
        className="restaurant-container"
      >
        <Typography variant="h2" component="h1">
          Oops something went wrong...
        </Typography>
        <Link underline="none" component={RouterLink} to={"/"}>
          <Button
            variant="contained"
            sx={{
              display: "flex",
              marginTop: 6,
            }}
          >
            <LocalPizzaIcon
              sx={{ paddingRight: 1 }}
              color="secondary"
            ></LocalPizzaIcon>
            <Typography>Back to homepage</Typography>
          </Button>
        </Link>
      </Box>
    </>
  );
};
