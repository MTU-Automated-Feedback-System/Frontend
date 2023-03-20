import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import Exercise from "./Components/Exercise";
import Nav from "./Containers/Nav";
/*
TODO:
      - depcheck client + server to remove unused package
 */

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercise" element={<Dashboard />} />
        <Route path="/exercise/:id" element={<Exercise />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
