import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Cart } from "./components/Cart";
import { Restaurant } from "./components/Restaurant";
import { Restaurants } from "./components/Restaurants";
import { ShoppingCartProvider } from "../src/contexts/ShoppingCartContext";

function App() {
  return (
    <div className="App">
      <ShoppingCartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Restaurants />}></Route>
            <Route
              path="/restaurant/:id"
              element={<Restaurant id={0} />}
            ></Route>
            <Route
              path="/cart"
              element={
                <Cart
                  cart={[]}
                  restaurantId={0}
                  menu={[]}
                  totalPrice={0}
                  id={0}
                  name={""}
                  price={0}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </div>
  );
}
export default App;
