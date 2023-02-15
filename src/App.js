import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import Assignment from "./Components/Assignment"
import Nav from "./Containers/Nav";
/*
TODO:
      - depcheck client + server to remove unused package
 */

const App = () => {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<Nav/>}/>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/assignment" element={<Assignment/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
