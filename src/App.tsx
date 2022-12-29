import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Restaurants } from "./components/Restaurants";
import { Restaurant } from "./components/Restaurant";
import { Cart } from "./components/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Restaurants />}></Route>
          <Route path="/restaurant/:id" element={<Restaurant />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
