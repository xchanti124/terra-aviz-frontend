import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { locationsReducer } from "./locationsSlice";

const store = configureStore({
    reducer: {
        
    },
    preloadedState: {
    
    }
})

export default store;
