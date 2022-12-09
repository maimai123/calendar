import { compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// 创建store
const store = configureStore(reducer);

export default store;
