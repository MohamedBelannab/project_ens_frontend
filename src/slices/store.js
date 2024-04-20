import loginSlice from "./loginSlice";
import studentSlice from "./studentSlice";
import formationSlice from "./formationSlice";
import departementSlice from "./departementSlice";
import { configureStore } from "@reduxjs/toolkit";
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE

export const store = configureStore({
    reducer: {
            login : loginSlice ,
            student : studentSlice,
            formation :  formationSlice,
            departement : departementSlice
        },

  })