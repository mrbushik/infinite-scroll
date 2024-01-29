import { createStore, compose, applyMiddleware } from "redux";

import rootReducer from "./reducers";
const composeEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware()));

export default store;
