import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "src/store";
import App from "./App.tsx";
import "./index.css";

async function deferRender() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser.js");
  return worker.start();
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  );
});
