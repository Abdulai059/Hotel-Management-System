import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/Restaurant/cart/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
