import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../src/store/store.js";
import { SearchProvider } from "./components/search/SearchContext.jsx";
import { ThemeProvider } from "./components/search/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SearchProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </SearchProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
