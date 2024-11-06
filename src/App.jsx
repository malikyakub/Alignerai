// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import TasksPage from "./pages/TasksPage";
import AddtaskPage from "./pages/AddtaskPage";
import AlignerPage from "./pages/AlignerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/add-task" element={<AddtaskPage/>}/>
        <Route path='/alignerai' element={<AlignerPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
