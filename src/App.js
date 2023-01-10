import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Dashboard from "./Components/Dashboard";

/*
TODO:
      - depcheck client + server to remove unused package
 */

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
