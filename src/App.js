import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./Components/Dashboard";
import Assignment from "./Components/Assignment"
/*
TODO:
      - depcheck client + server to remove unused package
 */

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/assignment" element={<Assignment/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
