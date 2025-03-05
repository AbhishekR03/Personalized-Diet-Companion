import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // ✅ Import Redux Provider
import store from "./redux/store"; // ✅ Import Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {" "}
    {/* ✅ Wrap the entire app with Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
