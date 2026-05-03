import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/Restaurant/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
