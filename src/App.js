import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import Exercise from "./Components/Exercise";
import Nav from "./Containers/nav";
import { useAuth } from "./Hooks/useAuthTest";
import Wip from "./Components/wip";

const App = () => {
  const auth = useAuth();
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercise" element={<Dashboard />} />
        <Route path="/exercise/:id" element={<Exercise />} />
        <Route path="/submissions" element={<Wip />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
