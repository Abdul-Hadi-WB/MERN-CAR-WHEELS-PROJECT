import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice"

const reducer = combineReducers({
    productSlice: productSlice
})

const store = configureStore({reducer})
export default store