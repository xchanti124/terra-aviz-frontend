import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import locationsReducer from "./locationsListSlice";
import locationsSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    locations: locationsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(locationsSaga);

export default store;
