import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./Contexts/authContext";

import "./index.css";
import App from "./App";
import Footer from "./Containers/footer";



ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
    <Footer />
  </>
);
