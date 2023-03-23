import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Cart } from "./components/Cart";
import { Restaurant } from "./components/Restaurant";
import { Restaurants } from "./components/Restaurants";
import { ShoppingCartProvider } from "../src/contexts/ShoppingCartContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NotFound } from "./components/NotFound";

const theme = createTheme();

theme.typography.h1 = {
  zIndex: 1,
  color: "white",
  fontSize: "1rem",
  "@media (min-width:600px)": {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.4rem",
  },
};

theme.typography.h2 = {
  zIndex: 1,
  color: "white",
  fontSize: "0.8rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
};

theme.typography.body1 = {
  zIndex: 1,
  color: "white",
  fontSize: "0.9rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
};

theme.palette.secondary = {
  light: "",
  dark: "#aa5217",
  main: "white",
  contrastText: "white",
};

theme.palette.primary = {
  light: "",
  dark: "#aa5217",
  main: "#d85e0d",
  contrastText: "white",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ShoppingCartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Restaurants />}></Route>
            <Route path="/restaurant/:id" element={<Restaurant />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </ThemeProvider>
  );
}
export default App;
