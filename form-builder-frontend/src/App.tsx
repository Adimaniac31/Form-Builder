import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import FormViewer from "./components/FormViewer";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/form/:link" element={<FormViewer />} />
      </Routes>
    </Router>
  );
};

export default App;


