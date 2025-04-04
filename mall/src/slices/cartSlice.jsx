import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/CartAPI";

export const getCartItemAsync = createAsyncThunk("getCartItemsAsync", () => {
    return getCartItems();
});

export const postChangeCartAsync = createAsyncThunk(
    "postCartItemsAsync",
    (param) => {
        return postChangeCart(param);
    }
);

const initState = [];

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initState,

    extraReducers: (builder) => {
        builder
            .addCase(getCartItemAsync.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(postChangeCartAsync.fulfilled, (state, action) => {
                return action.payload;
            });
    },
});

export default cartSlice.reducer;
