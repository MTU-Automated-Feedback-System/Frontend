import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Exercise from "./Pages/Exercise";
import Nav from "./Components/Layout/nav";
import Footer from "./Components/Layout/footer";
import { useAuth } from "./Hooks/useAuthTest";
import Wip from "./Components/wip";

const App = () => {
  // Nasty error that is thrown by something unknown that is only problematic in development mode
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  // const auth = useAuth();

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercise" element={<Dashboard />} />
        <Route path="/exercise/:id" element={<Exercise />} />
        <Route path="/submissions" element={<Wip />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
