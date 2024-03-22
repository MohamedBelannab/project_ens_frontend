import loginSlice from "./loginSlice";
import { configureStore } from "@reduxjs/toolkit";
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE

export const store = configureStore({
    reducer: {
            login : loginSlice ,
        },

  })