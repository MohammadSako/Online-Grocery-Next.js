import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "nookies";
import nookies from "nookies";
import getCookies from "../util/getCookies";
const getCookie = getCookies();

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAllPrice: 0,
    shippingFee: 5,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items = [
          ...state.items,
          {
            id: newItem.id,
            price: newItem.price,
            quantity: 1,
            totalPrice: newItem.price,
            title: newItem.title,
            image: newItem.image,
            description: newItem.description,
          },
        ];
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }

      //delete item from Cookie
      if (state.items.length > 0) {
        setCookie(null, "cartItems", JSON.stringify(state.items), {
          maxAge: 86400,
          path: "/",
          sameSite: Lax
        });
      }

      //cookie clear
      if (state.items.length === 0) {
        nookies.destroy(null, "cartItems");
      }
    },

    totalAllItems(state, action) {
      let amount = 0;
      let total = 0;
      state.items.forEach((item) => {
        amount += item.quantity;
        total += item.quantity * item.price;
      });
      state.totalQuantity = amount;
      state.totalAllPrice = total;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
