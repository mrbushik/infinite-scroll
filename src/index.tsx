import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store/store";
import MainPage from "./Pages/MainPage/MainPage";
import "../src/theme/theme.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <MainPage />
  </Provider>
);
