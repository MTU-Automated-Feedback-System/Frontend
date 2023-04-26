import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import Footer from "./Containers/Footer";

// Nasty error that is thrown by something unknown that is only problematic in development mode
const customErrorHandler = (error) => {
  const RESIZE_OBSERVER_ERROR = 'ResizeObserver loop limit exceeded';

  if (error !== RESIZE_OBSERVER_ERROR) {
    console.error(error);
  }
}

window.onerror = customErrorHandler;


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
   <React.StrictMode>
    <App />
  </React.StrictMode>
  <Footer/>
  </>
 
);
